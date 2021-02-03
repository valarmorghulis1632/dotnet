import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';
import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  errMessage: string;
  public note: Note;
  public states: Array<string> = ['Not Started','Started','Completed'];

  constructor(private notesDb: NotesService){
    this.note=new Note();
  }

  addNote(){
    if(!this.note.text || !this.note.title || !this.note.state){
      this.errMessage = 'Title and Text both are required fields';
      return;
    }
    if(this.note.state === 'Not Started'){
      this.note.state = 'not-started';
    }
    else if(this.note.state === 'Started'){
      this.note.state = 'started';
    }
    else if(this.note.state === 'Completed'){
      this.note.state = 'completed';
    }
    
    this.notesDb.addNote(this.note).subscribe(
      data => {
        if(data){
          console.log('SUCCESS ADD');
        }else{
          this.errMessage = 'Unable to add the note.';
        }
      },
      error => {
        this.errMessage = 'Http failure response for http://localhost:5000/api/commands: 404 Not Found';
   });
  }
}
