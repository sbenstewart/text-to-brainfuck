import { interpret, resetState } from './toText.js';
import { reverseInterpret } from './toBF.js';

$("#bf").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

function copy(value) {
    const pagelink = `Created using: ${document.location.href}`;
    value += ' ' + pagelink;
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("Copy");
    $temp.remove();
    new Noty({
        theme: 'metroui',
        text: 'Copied!',
        timeout: 1500,
        progressBar: false,
        type: 'success',
    }).show();
}

$("#cpText").click(function(event){
    const value = textInput.val();
    copy(value);
});

$("#bfText").click(function(event){
    const value = bfInput.val();
    copy(value);
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
    const textTemp = textInput.val();
    const bfTemp = reverseInterpret(textTemp);
    bfInput.val(bfTemp);
    if (!textTemp) {
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
        textToBf()
    });
    bfInput.keyup(() => {
        bfToText()
    });
}

convert();