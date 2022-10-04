import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HangmanComponent} from "./hangman/hangman.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/hangman', pathMatch: 'full' },
  { path: 'hangman', component: HangmanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
