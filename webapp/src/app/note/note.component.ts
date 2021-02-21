import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input()
  note: Note;

  constructor(private router: RouterService) {}

  editNote(){
    let noteId= this.note.id;
    console.log("FINE");
    console.log(noteId);
    this.router.routeToEditNoteView(noteId);
  }
}
