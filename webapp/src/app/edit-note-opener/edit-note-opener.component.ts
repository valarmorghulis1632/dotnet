import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {
  public id;

  constructor(private dialog: MatDialog, private activated: ActivatedRoute, private router: RouterService){
    
  }
  ngOnInit(): void {
    // this.activated.params.subscribe(params => {
    //   this.id = params.noteId;
    // });

    this.activated.paramMap.subscribe(params =>this.id=params.get('noteId'));
    this.dialog.open(EditNoteViewComponent,{
      data: {
        noteId: this.id
      }
    }).afterClosed().subscribe(result => {
      this.router.routeBack();
    })
  }



}
