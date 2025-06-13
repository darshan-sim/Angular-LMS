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
    },
    {
      id: '2',
      title: 'Shopping List',
      createdAt: new Date(),
      note: 'Buy milk, bread, and eggs.',
    },
    {
      id: '3',
      title: 'Workout Plan',
      createdAt: new Date(),
      note: 'Morning run and evening yoga.',
    },
    {
      id: '4',
      title: 'Book Recommendations',
      createdAt: new Date(),
      note: 'Read "Atomic Habits" and "Deep Work".',
    },
    {
      id: '5',
      title: 'Travel Itinerary',
      createdAt: new Date(),
      note: 'Visit Paris, Rome, and Barcelona.',
    },
  ]);
  allNotes = this.notes.asReadonly();

  addNote(data: { title: string; createdAt: Date; note: string }) {
    const newNote: Note = {
      ...data,
      id: Date.now().toString(),
    };
    this.notes.update((oldNotes) => [newNote, ...oldNotes]);
  }

  updateNote(id: string, data: Partial<Note>) {
    this.notes.update((oldNotes) =>
      oldNotes.map((note) => (note.id === id ? { ...note, ...data } : note))
    );
  }

  deleteNote(id: string) {
    this.notes.update((oldNotes) => oldNotes.filter((note) => note.id !== id));
  }

  getNoteById(id: string) {
    return computed(() => this.allNotes().find((note) => note.id === id));
  }
}
