import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { map } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('published', 'desc'));
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return { id, ...data }
          })
        })
    );
  }

  getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  createPost(newPost: Post) {
    this.postsCollection.add(newPost);
  }

  // utility function to get a post by id, used by delete & update
  // note: the reason why we can't use 'getPostData' above is b/c
  //  that method is subscribing to the post.
  getPostUtil(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }

  deletePost(id: string) {
    return this.getPostUtil(id).delete();
  }

  updatePost(id: string, formData) {
    return this.getPostUtil(id).update(formData);
  }
}
