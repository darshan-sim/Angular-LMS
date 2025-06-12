import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { PostsService } from '../../../shared/service/posts.service';
import { PostDTO } from '../../../shared/models/post';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit {
  postId = input<string>();
  mode = input<'create' | 'edit'>('create');

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    body: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });
  post!: PostDTO

  authService = inject(AuthService);
  postsService = inject(PostsService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    if (this.mode() === 'edit' && this.postId()) {
      const id = this.postId();
      if (id) {
        this.postsService.getPostById(id).subscribe({
          next: (post) => {
            if (post) {
              this.postForm.setValue({
                title: post.title,
                body: post.body,
              });
              this.post= post
            } else {
              this.router.navigate(['/not-found']);
            }
          },
        });
      }
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    if (this.postForm.valid) {
      const uId = this.authService.user()?.id;
      const postTitle = this.title?.value;
      const postBody = this.body?.value;

      if (uId && postTitle && postBody) {
        const dto = {
          userId: this.post.userId || uId,
          title: postTitle,
          body: postBody,
        };

        if (this.mode() === 'create') {
          this.postsService.createPost(dto);
        } else if (this.mode() === 'edit' && this.postId()) {
          const updatedPost: PostDTO = {
            ...dto,
            id: this.postId()!,
          };
          this.postsService.updatePost(this.postId()!, updatedPost);
        }
      }
    }
  }

  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }

  get titleErrors() {
    if (this.postForm.touched) {
      if (this.title?.hasError('required')) {
        return 'Title is required';
      }
      if (this.title?.hasError('minlength')) {
        return 'Title must be at least 3 characters long';
      }
    }
    return '';
  }

  get bodyErrors() {
    if (this.postForm.touched) {
      if (this.body?.hasError('required')) {
        return 'Body is required';
      }
      if (this.body?.hasError('minlength')) {
        return 'Body must be at least 10 characters long';
      }
    }
    return '';
  }
}
