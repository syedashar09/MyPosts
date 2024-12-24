import { NgPlural } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, NG_ASYNC_VALIDATORS, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/Auth/auth.service";
import { post } from "../post.model";
import { postsService } from "../posts.service";
import { mimeType } from "./mime-type.validator";

@Component({
	selector: "app-post-create",
	templateUrl: "./post-create.component.html",
	styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
	title: any;
	content: any;
	isLoading = false;
	private mode = "create";
	public post!: post;
	private postId: any;
	imagePreview: any;
	image: File;
	myform: FormGroup;
	authStatusSub: Subscription;
	// file!: File;

	constructor(
		private postservice: postsService,
		public route: ActivatedRoute,
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
			this.isLoading = false;
		});
		this.Form();
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			if (paramMap.has("postId")) {
				this.mode = "edit";
				this.postId = paramMap.get("postId");
				this.isLoading = true;
				this.postservice.getpost(this.postId).subscribe(postData => {
					this.isLoading = false;
					this.post = {
						id: postData._id,
						title: postData.title,
						content: postData.content,
						imagePath: postData.imagePath,
						creator: postData.creator,
					};
					this.myform.patchValue({
						title: this.post.title,
						content: this.post.content,
						image: this.post.imagePath,
					});
				});

				// console.log(this.post.title, this.post.content);
			} else {
				this.mode = "create";
				this.postId = "";
			}
		});
	}

	OnSavepost() {
		if (this.myform.invalid) return;
		// this.myform.value.image
		this.isLoading = true;
		if (this.mode === "create") {
			this.postservice.addposts(this.myform.value.title, this.myform.value.content, this.myform.value.image);
		} else {
			this.postservice.UpdatePost(
				this.postId,
				this.myform.value.title,
				this.myform.value.content,
				this.myform.value.image
			);
			this.router.navigate(["/"]);
		}
		this.myform.reset();
	}

	OnImagePicked(event: Event) {
		const file = (event.target as HTMLInputElement).files[0];
		this.myform.patchValue({ image: file });
		this.myform.get("image").updateValueAndValidity;
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result as ArrayBuffer;
		};

		reader.readAsDataURL(file);
	}
	//either define constant or function to get form value
	// get title() {
	// 	return this.myform.get('title');
	// }
	// get content() {
	// 	return this.myform.get('content');
	// }

	Form() {
		this.myform = this.fb.group({
			title: [null, [Validators.required, Validators.minLength(5)]],
			content: [null, [Validators.required, Validators.minLength(7)]],
			image: [null, { Validators: [Validators.required], asyncValidators: [mimeType] }],
		});
		// {  }
		this.title = this.myform.get("title");
		this.content = this.myform.get("content");
	}
}
