import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
        {
            path: 'view/noteview',
            component: NoteViewComponent
        },
        {
            path: 'view/listview',
            component: ListViewComponent
        },
        {
            path: 'note/:noteId/edit',
            component: EditNoteOpenerComponent,
            outlet: 'noteEditOutlet'
        },
        {
            path: '',
            redirectTo: 'view/noteview',
            pathMatch: 'full'
        }
    ]
  },
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
