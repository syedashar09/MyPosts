import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class postsService {
	isloading = false;
	Url = "http://localhost:3000/api/posts";
	private posts: post[] = [];

	private postUpdated = new Subject<{ posts: post[]; postCount: number }>();

	constructor(private http: HttpClient, private router: Router) {}

	//to match the id of input and db we have to map the data
	getPosts(postsPerPage: number, currentPage: number) {
		const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

		this.http
			.get<{ message: string; posts: any; maxPosts: number }>(this.Url + queryParams)
			.pipe(
				map(postData => {
					return {
						posts: postData.posts.map((post: any) => {
							return {
								id: post._id,
								title: post.title,
								content: post.content,
								imagePath: post.imagePath,
								creator: post.creator,
							};
						}),
						maxPosts: postData.maxPosts,
					};
				})
			)
			.subscribe(transformedpostData => {
				this.posts = transformedpostData.posts;
				this.postUpdated.next({ posts: [...this.posts], postCount: transformedpostData.maxPosts });
			});
	}

	getPostUpdateListener() {
		return this.postUpdated.asObservable();
	}

	//getting single post
	getpost(id: String) {
		return this.http.get<{ _id: string; title: string; content: string; imagePath: string; creator: string }>(
			"http://localhost:3000/api/posts/" + id
		);
	}

	addposts(title: string, content: string, image: File) {
		this.isloading = true;

		const postData = new FormData();

		postData.append("title", title);
		postData.append("content", content);
		postData.append("image", image);

		this.http
			.post<{ message: string; post: post }>("http://localhost:3000/api/posts", postData)
			.subscribe(Response => {
				this.router.navigate(["/"]);
			});
		// .subscribe(responseData => {
		// 	// const imagePath = responseData.post.imagePath;
		// 	// console.log(imagePath);
		// 	if (responseData) {
		// 		const post: post = {
		// 			id: "",
		// 			title: title,
		// 			content: content,
		// 			imagePath: "",
		// 		};
		// 		this.posts.push(post);
		// 		this.postUpdated.next([...this.posts]);
		// 		this.router.navigate(["/"]);
		// 		console.log(this.posts);
		// 	}
		// });
	}

	UpdatePost(id: string, title: string, content: string, image: File | string) {
		this.isloading = true;
		let postData: post | FormData;
		if (typeof image === "object") {
			postData = new FormData();
			postData.append("id", id);
			postData.append("title", title);
			postData.append("content", content);
			postData.append("image", image, title);
		} else {
			postData = {
				id: id,
				title: title,
				content: content,
				imagePath: image as string,
				creator: null,
			};
		}
		this.http.put("http://localhost:3000/api/posts/" + id, postData).subscribe(Response => {
			this.router.navigate(["/"]);
		});
	}
	// 	.subscribe(response => {
	// 	const post: post = {
	// 		id: id,
	// 		title: title,
	// 		content: content,
	// 		imagePath: "",
	// 	};
	// 	const updatedposts = [...this.posts];
	// 	const oldIndex = updatedposts.findIndex(p => {
	// 		p.id === id;
	// 	});
	// 	updatedposts[oldIndex] = post;
	// 	this.posts = updatedposts;
	// 	this.postUpdated.next([...this.posts]);
	// });

	//deleting selected post and updating frontend with filter method
	DeletePosts(Id: String) {
		return this.http.delete("http://localhost:3000/api/posts/" + Id);
	}

	// 	.subscribe(resposnseData => {
	// 	console.log(resposnseData);

	// 	const updatedpost = this.posts.filter(post => {
	// 		return post.id !== paramId;
	// 	});

	// 	this.posts = updatedpost;
	// 	this.postUpdated.next([...this.posts]);
	// });
}
