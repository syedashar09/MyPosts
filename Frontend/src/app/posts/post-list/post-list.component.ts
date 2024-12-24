import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { delay, retry, retryWhen, Subscription } from "rxjs";
import { AuthService } from "src/app/Auth/auth.service";
import { post } from "../post.model";
import { postsService } from "../posts.service";

@Component({
	selector: "app-post-list",
	templateUrl: "./post-list.component.html",
	styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
	isLoading = false;
	posts: post[] = [];
	private postSub: Subscription;
	totalPosts = 0;
	currentPage = 1;
	postsPerPage = 2;
	pageSizeOptions = [1, 2, 4, 6, 10, 15, 20];
	pageIndex = 3;
	public userAuthenticated = false;
	authStatusSub: Subscription;
	userId: string;

	constructor(private postservice: postsService, private authService: AuthService) {}

	ngOnInit(): void {
		this.isLoading = true;
		this.postservice.getPosts(4, 1);
		this.postSub = this.postservice
			.getPostUpdateListener()
			.subscribe((postData: { posts: post[]; postCount: number }) => {
				this.isLoading = false;
				this.posts = postData.posts;
				this.totalPosts = postData.postCount;
			});
		this.userId = this.authService.getUserId();
		this.userAuthenticated = this.authService.getIsAuth();
		this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
			this.isLoading = false;
			this.userAuthenticated = isAuthenticated;
			this.userId = this.authService.getUserId();
		});
	}

	OnDelete(paramId: String) {
		this.isLoading = true;
		this.postservice
			.DeletePosts(paramId)
			.subscribe(() => {
				this.postservice.getPosts(this.postsPerPage, this.currentPage);
			})
			.add(() => {
				this.isLoading = false;
			});
	}
	onChangePage(pageEvent: PageEvent) {
		this.isLoading = true;
		this.currentPage = pageEvent.pageIndex + 1;
		this.postsPerPage = pageEvent.pageSize;
		this.postservice.getPosts(this.postsPerPage, this.currentPage);
	}
	ngOnDestroy(): void {
		this.postSub.unsubscribe();
		this.authStatusSub.unsubscribe();
	}
}
