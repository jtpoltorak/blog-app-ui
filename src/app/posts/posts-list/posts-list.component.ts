import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(
    public authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  onDeletePost(id: string): void {
    this.postService.deletePost(id);
  }
}
