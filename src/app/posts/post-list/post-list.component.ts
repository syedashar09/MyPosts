import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { post } from '../post.model';
import { postsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: post[] = [];
  private postSub = new Subscription();
  // posts = [
  //   { title: 'First Post', content: "This is the first post's content" },
  //   { title: 'Second Post', content: "This is the second post's content" },
  //   { title: 'Third Post', content: "This is the third post's content" },
  // ];
  constructor(private postservice: postsService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.postservice.getPosts();
    this.postSub = this.postservice
      .getPostUpdateListener()
      .subscribe((posts: post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });

  }


  OnDelete(paramId: String) {
    this.postservice.DeletePosts(paramId);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
