import {interpret,resetState} from './toText.js';    

$("#bf").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);     
});

function isValid(str) {
    return /[+\-\[\]<>.,]/g.test(str);
}

const textInput = $('#text');
const bfInput = $('#bf');

function roundNum(num) {
    return Math.round(num * 100) / 100;
}

function textToBf() {
    const textTemp = parseFloat(textInput.val());
    const bfTemp = (textTemp * 9 / 5) + 32;
    bfInput.val(roundNum(bfTemp));
    if (isNaN(bfInput.val())) {
        bfInput.val('');
    }
}

function bfToText() {
    resetState();
    const bfTemp = bfInput.val();
    const textTemp = interpret(bfTemp);
    textInput.val(textTemp);
    if (!textInput.val()) {
        textInput.val('');
    }
}

function convert() {
    textInput.keyup(() => {
        //textToBf()
    });
    bfInput.keyup(() => {
        bfToText()
    });
}

convert();