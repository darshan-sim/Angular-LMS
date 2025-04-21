import { Component } from '@angular/core';
import { NewNoteComponent } from "./new-note/new-note.component";
import { NotesListComponent } from "./notes-list/notes-list.component";

@Component({
  selector: 'app-notes',
  imports: [NewNoteComponent, NotesListComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {}
