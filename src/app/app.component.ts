// src/app/app.component.ts
import { Component } from '@angular/core';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newNote: Note = new Note('', '');
  notes: Note[] = [];
  errMessage: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  addNote() {
    if (this.newNote.title.trim() === '' || this.newNote.text.trim() === '') {
      this.errMessage = 'Title and Text fields are required.';
      return;
    }

    this.notesService.addNote(this.newNote).subscribe(
      (response: Note) => {
        this.notes.push(response);
        this.newNote = new Note('', ''); // Clear the form
        this.errMessage = '';
      },
      (error) => {
        this.errMessage = 'Failed to add note. Please try again later.';
      }
    );
  }

  loadNotes() {
    this.notesService.getNotes().subscribe(
      (response: Note[]) => {
        this.notes = response;
        this.errMessage = '';
      },
      (error) => {
        this.errMessage = 'Failed to fetch notes. Please try again later.';
      }
    );
  }
}
