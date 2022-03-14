// @ts-check

import _ from 'lodash';

export default class SpeechApp {
  constructor(options = { lang: 'ru-RU' }) {
    // eslint-disable-next-line
    const RecognitionApi = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new RecognitionApi();
    this.recognition.lang = options.lang;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    // eslint-disable-next-line
    this.speechRecognitionList = window.SpeechGrammarList || webkitSpeechGrammarList;
  }

  setResultHanler(callback) {
    this.recognition.onresult = (event) => {
      const last = _.last(event.results);
      const lastResult = _.last(last);
      const text = lastResult.transcript;
      callback(text);
    };
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }
}
