import { Component, OnDestroy, OnInit } from '@angular/core';
import { postsService } from '../posts/posts.service';
import { post } from '../posts/post.model';
import { Subscription } from 'rxjs';
import { ThemeChangerService } from '../app.theme-changer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: post[] = [];
  private postSub: Subscription;
  totalPosts: number;
  isDarkMode: boolean;

  constructor(
    private postService: postsService,
    private themeChanger: ThemeChangerService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(3, 1);
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: { posts: post[]; postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });

    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    this.themeChanger.setDarkMode(savedTheme);
  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
