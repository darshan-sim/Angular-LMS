import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { PostsService } from '../../shared/service/posts.service';

@Component({
  selector: 'app-posts',
  imports: [ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    body: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  authService = inject(AuthService);
  postsService = inject(PostsService);

  onSubmit() {
    if (this.postForm.valid) {
      console.log(this.postForm);
      const uId = this.authService.user()?.id;
      const postTitle = this.title?.value;
      const postBody = this.body?.value;

      if (uId && postTitle && postBody) {
        const dto = {
          userId: uId,
          title: postTitle,
          body: postBody,
        };
        this.postsService.createPost(dto);
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
    if (this.title?.touched) {
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
    if (this.body?.touched) {
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
