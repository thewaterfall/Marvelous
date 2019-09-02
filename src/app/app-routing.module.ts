import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeroBoardComponent} from "./components/hero-board/hero-board.component";


const routes: Routes = [
  {path: "", component: HeroBoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
