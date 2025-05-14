import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  imports: [FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.css',
})
export class CommentInputComponent {
  userId = input<string | undefined>(undefined);
  @Output() submitComment = new EventEmitter<string>();
  text = '';

  emit() {
    const trimmed = this.text.trim();
    if (trimmed) {
      this.submitComment.emit(trimmed);
      this.text = '';
    }
  }
}
