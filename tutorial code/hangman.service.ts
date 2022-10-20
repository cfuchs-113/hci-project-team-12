import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface TranscriptionResponseData {
  guess: string;
}

@Injectable({ providedIn: 'root' })
export class HangmanService  {

  constructor(private http: HttpClient ) {}

  transcribe(audioData: string) {
    return this.http
      .post<TranscriptionResponseData>('http://127.0.0.1:8000/transcribe/',
        {
          audioData: audioData
        })
      .pipe(
        catchError(this.handleError),
        tap(resData =>  {
            console.log(resData);
        })
      );
  }

  handleGuess(guess: string) {
    // TODO
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(() => errorMessage);
  }

}
