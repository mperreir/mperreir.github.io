'use strict';

const theSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
if (!!theSpeechRecognition) {
    recognition = new theSpeechRecognition();
} else {
    console.log("No Speech Recognition API available");
}
const initTTS = function() {
    let subtitle = ['div.transcript'].toDOM(document.querySelector('body')); 
    subtitle.setAttribute('style', 'visibility: hidden;');
    if (! recognition)
       return;
    recognition.lang = 'FR_fr';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function(event) {
        //console.log(event);
        //console.log(event.resultIndex, [...event.results].map(srr => [...srr].map(sra => sra.transcript).join('/') + srr.isFinal));
        subtitle = ['div.transcript',
            ...[...event.results].slice(event.resultIndex).map(srr => ['p', srr.isFinal ? {} : {class: 'interim'}, [...srr].map(sra => sra.transcript).join('/')]),
        ].toDOM({replace: subtitle});
    }
    //recognition.start();
    let started = false;
    document.addEventListener('keydown', (event) => {
        const keyPressed = event.key;

        if( keyPressed == 't' ){
            if (started) {
                recognition.stop();
                started = false;
                subtitle = ['div.transcript'].toDOM({replace: subtitle});
                subtitle.setAttribute('style', 'visibility: hidden;');
            }
            else {
                recognition.start();
                started = true;
                subtitle.setAttribute('style', 'visibility: visible;');
            }
            console.log('Speech-to-text: ', started);
        }
    });
}
