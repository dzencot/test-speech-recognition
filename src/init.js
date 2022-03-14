// @ts-check

import Speech from './Speech.js';
import 'bootstrap';

export default () => {
  const element = document.getElementById('point');
  const obj = new Speech(element);
  obj.init();
};
