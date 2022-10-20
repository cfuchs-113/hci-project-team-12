Here is some code from the tutorial video.

hangman.service.ts and hangman.component.ts contain the code for getting the speech input and converting it
first into a file and then into a base64 encoded string. This is then sent to the backend. views.py handles
the json sent from the frontend and forwards it to Google Cloud Speech-to-Text and receives a transcription back.
Then transcription is then sent back to the frontend.

game.py contains the code for a terminal based hangman game.