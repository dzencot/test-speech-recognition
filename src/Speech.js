// @ts-check

import onChange from 'on-change';
import SpeechApi from './SpeechApi.js';

export default class SpeechApp {
  constructor(element) {
    this.element = element;
    this.state = {
      text: '',
      isStart: false,
    };
  }

  init() {
    this.button = document.getElementById('speechButton');
    this.input = document.getElementById('exampleFormControlTextarea1');
    this.button.addEventListener('click', (e) => this.switchRecognition(e));

    this.speechApi = new SpeechApi();

    this.speechApi.setResultHanler((text) => {
      this.watchedObject.text = text;
    });

    this.onChange();
  }

  switchRecognition(e) {
    e.preventDefault();
    this.watchedObject.isStart = !this.watchedObject.isStart;
  }

  recognitionStart() {
    this.speechApi.start();
  }

  recognitionStop() {
    this.speechApi.stop();
  }

  onChange() {
    this.watchedObject = onChange(this.state, (path, value) => {
      switch (path) {
        case 'text':
          this.input.textContent = value;
          break;
        case 'isStart':
          if (value) {
            this.recognitionStart();
            this.button.classList.add('btn-danger');
          } else {
            this.recognitionStop();
            this.button.classList.remove('btn-danger');
          }
          break;
        default:
          break;
      }
    });
  }
}
