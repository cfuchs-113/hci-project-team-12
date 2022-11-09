import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HangmanComponent} from "./hangman/hangman.component";
import {MultiplayerComponent} from "./multiplayer/multiplayer.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/hangman', pathMatch: 'full' },
  { path: 'hangman', component: HangmanComponent },
  { path: 'multiplayer', component: MultiplayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
