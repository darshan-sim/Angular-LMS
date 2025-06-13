import { Routes } from '@angular/router';
import { NoteComponent } from './notes/note/note.component';
import { Component } from '@angular/core';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [{ path: 'note/:id', component: NoteComponent }, {path: '', component: NotesComponent} ];
