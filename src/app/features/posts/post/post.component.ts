import { Component, input } from '@angular/core';
import { PostDTO } from '../../../shared/models/post';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  post= input.required<PostDTO>()
}
