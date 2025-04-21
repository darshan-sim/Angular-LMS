import { Component, inject } from '@angular/core';
import { NoteService } from '../note.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent {
  private router = inject(Router);
  onEdit(id: string) {
    this.router.navigate(['/note', id], {
      queryParams: { edit: 'true' },
    });
  }
  readonly notes = inject(NoteService).allNotes;
  private noteService = inject(NoteService);

  onDelete(id: string) {
    this.noteService.deleteNote(id);
  }
  onRestore(id: string) {
    this.noteService.restoreNote(id);
  }
}
