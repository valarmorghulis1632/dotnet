import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Array<Note> = [];
  notesSubject: BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);

  constructor(private serverIteractor:HttpClient, private authService: AuthenticationService) {}

  fetchNotesFromServer() {
    return this.serverIteractor.get<Array<Note>>('http://localhost:5000/api/commands').subscribe(data => {
      if(data){
        this.notes = data;
        this.notesSubject.next(this.notes);
        console.log(this.notesSubject);
      }else{
        console.log('ERROR FETCHSERVICE 1');
      }
    }, error => {
      console.log('ERROR FETCHSERVICE 2')
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    console.log(note);
    console.log(note.id);
    return this.serverIteractor.post<Note>('http://localhost:5000/api/commands',note).pipe(tap(newNote => {
      this.notes.push(newNote);
      this.notesSubject.next(this.notes);
    }));
  }

  editNote(note: Note): Observable<Note> {
    return this.serverIteractor.put<Note>(`http://localhost:5000/api/commands/${note.id}`,note).pipe(tap(editNote => {
      const note = this.notes.find(note => note.id === editNote.id);
      console.log(note);
      console.log(editNote);
      Object.assign(note,editNote);
      this.notesSubject.next(this.notes);
    }))
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(note => note.id == noteId);
    return Object.assign({},note);
  }
}
