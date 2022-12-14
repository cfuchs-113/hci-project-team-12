import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HangmanService, TranscriptionResponseData } from "./hangman.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit {
  mediaRecorder: any;
  chunks: any;
  recording: boolean;
  option: any;
  checkbox: any;
  speechGuess: string;
  textGuess: string;
  verify: boolean;
  word: string;
  lives: number;
  attempt: string;
  lastGuess: string;
  winner: boolean;
  loser: boolean;
  gameover: boolean;
  animals: [string, string, string, string, string, string, string, string, string, string];


  constructor( private hangmanService: HangmanService, private cdr: ChangeDetectorRef ) {
    this.recording=false;
    this.mediaRecorder = null;
    this.chunks = [];
    this.checkbox = false;
    this.speechGuess = '';
    this.textGuess = '';
    this.verify = false;
    this.word = '';
    this.attempt = '';
    this.lives = 10;
    this.lastGuess = '';
    this.winner = false;
    this.loser = false;
    this.gameover = false;
    this.animals = ['dog', 'cat', 'fox', 'deer', 'elk', 'moose', 'raccoon', 'chicken', 'horse', 'donkey'];
    this.setupGame();
  }

  setupGame() {
    this.lives = 10;
    this.winner = false;
    this.loser = false;
    this.gameover = false;
    this.lastGuess = '';
    this.word = this.animals[Math.random() * this.animals.length | 0];
    console.log(this.word);
    this.attempt = this.word;
    for (let i = 0; i < this.word.length; i++) {
      this.attempt = this.attempt.replace(this.word[i], '_');
    }
  }

  onPlayAgain() {
    this.setupGame();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.option='text';
  }

  onSubmit(form: NgForm) {
    this.formatGuess(form.value.guess, this.checkbox, false);
    this.handleGuess(this.textGuess);
  }

  onRecord() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
        navigator.mediaDevices
          .getUserMedia(
            // constraints - only audio needed for this app
            {
              audio: true,
            }
          )

          .then((stream) => {
            this.recording = true;
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();
            console.log(this.mediaRecorder.state);
            console.log("recorder started");
            this.mediaRecorder.ondataavailable = (e: { data: any; }) => {
              this.chunks.push(e.data);
            }
            this.cdr.detectChanges();
          })

          .catch((err) => {
            console.error(`The following getUserMedia error occurred: ${err}`);
          });
      } else {
        console.log("getUserMedia not supported on your browser!");
      }
  }

  onStopRecord() {
    this.recording = false;
    this.cdr.detectChanges();
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log("recorder stopped");

    this.mediaRecorder.onstop = () => {
      console.log("Creating Audio File");
      const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
      this.chunks = [];
      this.getBase64(blob,(result) => {
        let audioData = result;
        let hangmanObs: Observable<TranscriptionResponseData>;
        hangmanObs = this.hangmanService.transcribe(audioData);
        hangmanObs.subscribe({
          next: resData => {
            this.formatGuess(resData.guess, this.checkbox, true);
            this.verify = true;
            this.cdr.detectChanges();
          },
          error: error => {
            console.log (error);
          }
        })
      });
    };
  }

  onVerified() {
    this.verify = false;
    this.handleGuess(this.speechGuess);
    this.cdr.detectChanges();
  }

  onWrong() {
    this.speechGuess = '';
    this.verify = false;
    this.cdr.detectChanges();
  }

  private formatGuess(guess: string, guessAnswer: boolean, speech: boolean) {
    if (!guessAnswer) {
      guess = Array.from(guess)[0];
    }
    if (speech) {
      this.speechGuess = guess;
    } else {
      this.textGuess = guess;
      this.cdr.detectChanges();
      console.log(this.textGuess);
    }
  }

  getBase64(file: Blob, cb: { (result: any): void; (arg0: string | ArrayBuffer | null): void; }) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

      // @ts-ignore
      cb(reader.result.split(',')[1]);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  handleGuess(guess: string) {
    guess = guess.toLowerCase();
    if (guess.length === 1) {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === guess) {
          this.attempt = this.attempt.substring(0, i) + guess + this.attempt.substring(i + 1);
        }
      }
      let j = this.word.indexOf(guess);
      if (j === -1) {
        this.lives -= 1;
        this.lastGuess = 'Incorrect!';
      } else {
        this.lastGuess = 'Correct!';
      }
      if (this.attempt === this.word) {
        this.winner = true;
        this.gameover = true;
      }
    } else {
      if (guess === this.word) {
        this.attempt = guess;
        this.lastGuess = 'Correct!';
        this.winner = true;
        this.gameover = true;
      } else {
        this.lives -= 1;
        this.lastGuess = "Incorrect!"
      }
    }
    if (this.lives === 0) {
      this.loser = true;
      this.gameover = true;
    }
  }

}
