import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';

const routes: Routes = [
  {path: '', component: UserSelectionComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
