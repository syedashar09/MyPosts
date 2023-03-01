import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { post } from '../post.model';
import { postsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  title: any = '';
  content: any = '';
  isLoading = false;
  private mode = 'create';
  public post?: post;
  private postId: any;

  myform: FormGroup;

  constructor(
    private postservice: postsService,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postservice.getpost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          this.myform.patchValue({
            title: this.post.title,
            content: this.post.content,
          });
        });

        // console.log(this.post.title, this.post.content);
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
    this.title = this.myform.get('title');
    this.content = this.myform.get('content');
  }

  OnSavepost() {
    if (this.mode === 'create') {
      this.postservice.addposts(
        this.myform.value.title,
        this.myform.value.content
      );

      console.log(this.myform.value.title);
      console.log(this.myform.value.content);
      this.router.navigate(['/']);
    } else {
      this.postservice.UpdatePost(
        this.postId,
        this.myform.value.title,
        this.myform.value.content
      );
      this.router.navigate(['/']);
    }
    this.myform.reset();
  }
  OnImagePicked(event: Event) {

  }
  //either define constant or function to get form value
  // get title() {
  //   return this.myform.controls['title'].value;
  // }
  // get content() {
  //   return this.myform.controls['content'].value;
  // }
}
