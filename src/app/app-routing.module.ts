import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelptekstComponent } from './helptekst/helptekst.component';
import { HelptekstsComponent } from './helpteksts/helpteksts.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'list', component: HelptekstsComponent },
  { path: 'add', component: HelptekstComponent },
  { path: 'detail/:id', component: HelptekstComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
