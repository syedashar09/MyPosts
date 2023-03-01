import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class postsService {
  Url = 'http://localhost:3000/api/posts';
  private posts: post[] = [];

  private postUpdated = new Subject<post[]>();

  constructor(private http: HttpClient) {}

  //to match the id of input and db we have to map the data
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedpost) => {
        this.posts = transformedpost;
        this.postUpdated.next([...this.posts]);
      });
  }
  ngOnInit() {}

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  //getting single post
  getpost(id: String) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  UpdatePost(id: string, title: string, content: string) {
    const post: post = { id: id, title: title, content: content };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        const updatedposts = [...this.posts];
        const oldIndex = updatedposts.findIndex((p) => p.id === post.id);
        updatedposts[oldIndex] = post;
        this.posts = updatedposts;
        this.postUpdated.next([...this.posts]);
      });
  }

  addposts(title: string, content: string) {
    const post: post = { id: null!, title: title, content: content };
    this.http
      .post<{ message: string; paramId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        console.log(responseData.message, responseData.paramId);
        const postId = responseData.paramId;
        post.id = postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  //deleting selected post and updating frontend with filter method
  DeletePosts(paramId: String) {
    this.http
      .delete('http://localhost:3000/api/posts/' + paramId)
      .subscribe((resposnseData) => {
        console.log(resposnseData);

        const updatedpost = this.posts.filter((post) => {
          return post.id !== paramId;
        });
        // const updatedpost = this.posts.filter( post=> {
        //   post.id !== paramId;
        // });
        // .map(post =>{ return post})
        this.posts = updatedpost;
        this.postUpdated.next([...this.posts]);
      });
  }
}
