import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelptekstComponent } from './helptekst/helptekst.component';
import { HelptekstsComponent } from './helpteksts/helpteksts.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'list', component: HelptekstsComponent },
  { path: 'add', component: HelptekstComponent },
  { path: 'detail/:id', component: HelptekstComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [],

  imports: [RouterModule.forRoot(routes
    , { enableTracing: true } // <-- debugging purposes
  )],
  exports: [RouterModule]

})
export class AppRoutingModule { }
