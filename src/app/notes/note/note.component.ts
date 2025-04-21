import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note.service';
import { CommonModule, NgIf, Location } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  private route = inject(ActivatedRoute);
  private noteService = inject(NoteService);
  private location = inject(Location);
  private router = inject(Router);

  noteId = signal<string>('');

  form = signal({ title: '', note: '', createdAt: new Date() });

  errors = false;
  isEditing = false;

  onEdit() {
    // this.isEditing = true;
    this.router.navigate([], {
      queryParams: { edit: true },
      queryParamsHandling: 'merge',
    });
  }

  onCancel() {
    this.router.navigate([], {
      queryParams: { edit: null },
      queryParamsHandling: 'merge',
    });
    const originalNote = this.note();
    if (originalNote) {
      this.form.set({
        title: originalNote.title,
        note: originalNote.note,
        createdAt: new Date(originalNote.createdAt),
      });
    }
  }

  onRestore(id: string | undefined) {
    console.log(id);
    if (id) {
      this.noteService.restoreNote(id);
    }
  }

  onDelete(id: string | undefined) {
    if (id) {
      this.noteService.deleteNote(id);
    }
  }

  goBack() {
    // this.location.back();
    this.router.navigate(['/']);
  }

  note = computed(() => {
    const id = this.noteId();
    return this.noteService.getNoteById(id)() ?? null;
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.noteId.set(id);
      }
    });
    this.route.queryParamMap.subscribe((params) => {
      const isEdit = params.get('edit') === 'true';
      this.isEditing = isEdit;
    });
    effect(() => {
      const note = this.note();
      if (note) {
        this.form.set({
          title: note.title,
          note: note.note,
          createdAt: new Date(note.createdAt),
        });
      }
    });
  }

  get dateString() {
    const note = this.form();
    return note ? note.createdAt.toISOString().split('T')[0] : '';
  }

  set dateString(value: string) {
    const date = new Date(value);
    const currentForm = this.form();
    this.form.set({
      ...currentForm,
      createdAt: date,
    });
  }

  onSubmit() {
    this.errors = !this.validate();
    if (this.errors) {
      return;
    }
    this.noteService.updateNote(this.noteId(), {
      title: this.form().title,
      createdAt: this.form().createdAt,
      note: this.form().note,
    });
    this.isEditing = false;
  }

  validate() {
    const isEmptyTitle = !this.form().title || this.form().title.trim() === '';
    const isEmptyNote = !this.form().note || this.form().note.trim() === '';
    const isEmptyDate = !this.dateString;
    return !(isEmptyTitle || isEmptyNote || isEmptyDate);
  }
}
