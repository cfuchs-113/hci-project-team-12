import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HangmanComponent } from './hangman/hangman.component';
import { HttpClientModule } from "@angular/common/http";
import { MultiplayerComponent } from "./multiplayer/multiplayer.component";

@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent,
    MultiplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
