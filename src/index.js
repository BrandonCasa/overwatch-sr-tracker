/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";
import firebaseConfig from './firebase';
import {createWorker} from 'tesseract.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const width = 2560;    // We will scale the photo width to this
let height = 0;
let streaming = false;
const EXTENSION_ID = 'daobgjnpnjjljdncegbbeofjalbamlmo';

const video = document.getElementById('screen-view');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const request = {sources: ['screen']};
let stream;

chrome.runtime.sendMessage(EXTENSION_ID, request, response => {
  if (response && response.type === 'success') {
    navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: response.streamId,
        }
      }
    }).then(returnedStream => {
      stream = returnedStream;
      video.srcObject = stream;
      video.addEventListener('canplay', function (ev) {
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;

        const cropCanvas = (sourceCanvas, left, top, width, height) => {
          let destCanvas = document.createElement('canvas');
          destCanvas.width = width;
          destCanvas.height = height;
          destCanvas.getContext("2d").drawImage(
              sourceCanvas,
              left, top, width, height,  // source rect with content to crop
              0, 0, width, height);      // newCanvas, same size as source rect
          return destCanvas;
        }

        const context = canvas.getContext('2d');
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);

          const worker = createWorker();

          (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const {data: {text}} = await worker.recognize(cropCanvas(canvas, width * 0.344921875, height * 0.51597222222, width * 0.02890625, height * 0.03055555555).toDataURL());
            console.log("tank" + text);
            await worker.terminate();
          })();

          const worker2 = createWorker();

          (async () => {
            await worker2.load();
            await worker2.loadLanguage('eng');
            await worker2.initialize('eng');
            const {data: {text}} = await worker2.recognize(cropCanvas(canvas, width * 0.49140625, height * 0.51597222222, width * 0.02890625, height * 0.03055555555).toDataURL());
            console.log("damage" + text);
            await worker2.terminate();
          })();

          const worker3 = createWorker();

          (async () => {
            await worker3.load();
            await worker3.loadLanguage('eng');
            await worker3.initialize('eng');
            const {data: {text}} = await worker3.recognize(cropCanvas(canvas, width * 0.637109375, height * 0.51597222222, width * 0.02890625, height * 0.03055555555).toDataURL());
            console.log("support" + text);
            await worker3.terminate();
          })();
        } else {
          const context = canvas.getContext('2d');
          context.fillStyle = "#AAA";
          context.fillRect(0, 0, canvas.width, canvas.height);

          const data = canvas.toDataURL();
        }
      }, false);
    }).catch(err => {
      console.error('Could not get stream: ', err);
    });
  } else {
    console.error('Could not get stream');
  }
});
