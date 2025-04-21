import { computed, Injectable, signal } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes = signal<Note[]>([
    {
      id: '1',
      title: 'Meeting Notes',
      createdAt: new Date(),
      note: 'Discuss project milestones and deadlines.',
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '2',
      title: 'Shopping List',
      createdAt: new Date(),
      note: 'Buy milk, bread, and eggs.',
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '3',
      title: 'Workout Plan',
      createdAt: new Date(),
      note: 'Morning run and evening yoga.',
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '4',
      title: 'Book Recommendations',
      createdAt: new Date(),
      note: 'Read "Atomic Habits" and "Deep Work".',
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '5',
      title: 'Travel Itinerary',
      createdAt: new Date(),
      note: 'Visit Paris, Rome, and Barcelona.',
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]);
  allNotes = this.notes.asReadonly();

  addNote(data: { title: string; createdAt: Date; note: string }) {
    const newNote: Note = {
      ...data,
      id: Date.now().toString(),
      deletedAt: null,
      updatedAt: null,
    };
    this.notes.update((oldNotes) => [newNote, ...oldNotes]);
  }

  updateNote(id: string, data: Partial<Note>) {
    this.notes.update((oldNotes) =>
      oldNotes.map((note) =>
        note.id === id ? { ...note, ...data, updatedAt: new Date() } : note
      )
    );
  }

  deleteNote(id: string) {
    this.notes.update((oldNotes) =>
      oldNotes.map((note) =>
        note.id === id
          ? { ...note, updatedAt: new Date(), deletedAt: new Date() }
          : note
      )
    );
  }

  restoreNote(id: String) {
    this.notes.update((oldNotes) =>
      oldNotes.map((note) =>
        note.id === id
          ? { ...note, updatedAt: new Date(), deletedAt: null }
          : note
      )
    );
  }

  getNoteById(id: string) {
    return computed(() => this.allNotes().find((note) => note.id === id));
  }
}
