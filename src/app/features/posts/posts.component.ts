import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { PostsService } from '../../shared/service/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComponent } from '../../shared/components/post/post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { CommonModule } from '@angular/common';
import { PostDTO } from '../../shared/models/post';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PostComponent,
    PostFormComponent,
    CommonModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  authService = inject(AuthService);
  postsService = inject(PostsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  action: 'view' | 'create' | 'edit' = 'view';
  postId?: string;
  currentPost?: PostDTO;

  ngOnInit() {
    const routeAction = this.route.snapshot.data['action'];
    if (routeAction) {
      this.action = routeAction as 'view' | 'create' | 'edit';
    }

    this.route.queryParams.subscribe((params) => {
      if (params['action']) {
        this.action = params['action'] as 'view' | 'create' | 'edit';
      }

      if (params['id']) {
        this.postId = params['id'];

        if (this.action === 'view' || this.action === 'edit') {
          if (this.postsService.allPosts().length === 0) {
            this.postsService.loadNextPage();
          }

          if (this.postId) {
            this.postsService.getPostById(this.postId).subscribe({
              next: (post) => {
                if (post) {
                  this.currentPost = post;
                } else {
                  this.router.navigate(['/not-found']);
                }
              },
            });
          }
        }
      }
    });

    // Load posts if they haven't been loaded yet
    if (this.postsService.allPosts().length === 0) {
      this.postsService.loadNextPage();
    }
  }
}
