import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostService } from './post.service';

const routes: Routes = [
  { path: 'blog', component: PostsListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  { path: 'dashboard', component: PostDashboardComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PostDetailComponent,
    PostDashboardComponent,
    PostsListComponent
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }
