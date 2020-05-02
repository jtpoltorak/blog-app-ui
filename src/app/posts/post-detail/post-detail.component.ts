import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService.getPostData(id).subscribe(data => this.post = data);
  }

  onUpdatePost(): void {
    const formData = {
      title: this.post.title,
      content: this.post.content
    };
    this.postService.updatePost(this.route.snapshot.paramMap.get('id'), formData);
    this.isEditing = false;
  }

  onDeletePost(): void {
    this.postService.deletePost(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/blog']);
  }
}
