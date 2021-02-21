import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;

  constructor(private router: RouterService, private activated: ActivatedRoute, private autService: AuthenticationService){}

  changeView(){
    // let view = this.activated.snapshot.children[0].children[0].url[1].path;
    // if(view == 'noteview'){
      if(this.isNoteView === true) {
      this.isNoteView = false;
      this.router.routeToListView();
    }
    else{
      this.isNoteView = true;
      this.router.routeToNoteView();
    }
  }

  logout(){
    this.autService.deleteToken();
    this.router.routeToLogin();
  }
}
