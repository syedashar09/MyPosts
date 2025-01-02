import { Component, OnDestroy, OnInit } from '@angular/core';
import { postsService } from '../posts/posts.service';
import { post } from '../posts/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {
 isLoading=false;
posts:post[]=[];
private postSub:Subscription;
totalPosts:number;



constructor(private postService:postsService){}

  ngOnInit (): void {
    this.isLoading=true;
    this.postService.getPosts(3,1);
    this.postSub = this.postService.getPostUpdateListener().subscribe(
      (postData:{posts:post[] , postCount:number})=>{
        this.isLoading=false;
        this.posts = postData.posts;
				this.totalPosts = postData.postCount;
      });
    }
  ngOnDestroy (): void {
    this.postSub.unsubscribe();
  }


  }
