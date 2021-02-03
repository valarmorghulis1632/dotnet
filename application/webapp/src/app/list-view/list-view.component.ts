import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  errMessage: string;
  constructor(private notesDb: NotesService) {}

  ngOnInit() {
    this.notesDb.getNotes().subscribe(data => {
      if(data){
        console.log(data);
        this.notStartedNotes = [];
        this.startedNotes = [];
        this.completedNotes = [];
        data.forEach(note => {
          if(note.state === 'not-started'){
            this.notStartedNotes.push(note);
          }else if(note.state === 'started'){
            this.startedNotes.push(note);
          }else{
            this.completedNotes.push(note);
          }
        })
      }else{
        this.errMessage = 'Failed 1';
      }
    },error => {
     this.errMessage = 'Failed 2';
    })
  }
}
