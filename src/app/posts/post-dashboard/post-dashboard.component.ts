import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string;
  content: string;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  // STOPPED HERE: https://youtu.be/Rpe8s4-qFFI?t=4263
  createPost() {
    const newPost = {
      author: this.authService.authState.displayName || this.authService.authState.email,
      authorId: this.authService.currentUserId,
      content: this.content,
      image: 'xyz', // this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.createPost(newPost);
  }

}
