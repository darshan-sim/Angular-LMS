import { Component, input } from '@angular/core';
import { CommentDTO } from '../../../models/comments';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  comment = input.required<CommentDTO>()
}
