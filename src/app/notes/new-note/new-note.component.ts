import { Component, inject, Output } from '@angular/core';
import { FormsModule, ValueChangeEvent } from '@angular/forms';
import { NoteService } from '../note.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-note',
  imports: [FormsModule, NgIf],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css',
})
export class NewNoteComponent {
  title: string = '';
  note: string = '';
  date: Date = new Date();

  errors = false;

  private noteService = inject(NoteService);

  get dateString() {
    return this.date.toISOString().split('T')[0];
  }

  set dateString(value: string) {
    this.date = new Date(value);
  }

  onSubmit() {
    this.errors = !this.validate();
    if (this.errors) {
      return;
    }
    this.noteService.addNote({
      title: this.title,
      createdAt: this.date,
      note: this.note,
    });
    this.title = '';
    this.date = new Date();
    this.note = '';
  }

  validate() {
    const isEmptyTitle = !this.title || this.title.trim() === '';
    const isEmptyNote = !this.note || this.note.trim() === '';
    const isEmptyDate = !this.dateString;
    return !(isEmptyTitle || isEmptyNote || isEmptyDate);
  }
}
