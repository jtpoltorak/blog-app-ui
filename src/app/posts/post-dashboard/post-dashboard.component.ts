import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

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

  buttonText = 'Create Post';

  imageUploadPercent: Observable<number>;
  imageURL: string;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private afStorage:AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onUploadImage(event) {
    const imageFile = event.target.files[0];
    if (imageFile.type.split('/')[0] !== 'image') {
      return alert('Please only upload image files.');
    } else {
      const imageUploadPath = `posts/${imageFile.name}`;
      const imageUploadReference = this.afStorage.ref(imageUploadPath);
      const imageUploadTask = this.afStorage.upload(imageUploadPath, imageFile);
      this.imageUploadPercent = imageUploadTask.percentageChanges();
      imageUploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            imageUploadReference.getDownloadURL().subscribe(url => {
              if (url) {
                this.imageURL = url;
              }
            })
          })
        )
        .subscribe();
    }
  }

  onCreatePost() {
    const newPost = {
      author: this.authService.authState.displayName || this.authService.authState.email,
      authorId: this.authService.currentUserId,
      content: this.content,
      image: this.imageURL,
      published: Date.now(),
      title: this.title
    };
    this.postService.createPost(newPost);
    this.title = '';
    this.content = '';
    this.buttonText = 'Post Created';
    setTimeout(() => this.buttonText = 'Create Post', 3000);
  }
}
