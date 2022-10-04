import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
  mediaRecorder: any;
  chunks: any;
  recording: boolean;
  option: any;
  constructor() {
    this.recording=false;
    this.mediaRecorder = null;
    this.chunks = [];
  }

  ngOnInit() {
    this.option='text';
  }

  onSubmit(form: NgForm) {
    console.log(form.value.guess);
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
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log("recorder stopped");

    this.mediaRecorder.onstop = (e: any) => {
      console.log("Still stopped");
      const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
      this.chunks = [];
      const audioURL = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = audioURL;
      link.download = "test.ogg";
      link.innerHTML = "Click here";
      document.body.appendChild(link);
    };
  }

}
