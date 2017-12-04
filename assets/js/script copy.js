var wordList = ['Columbia', 'Dupont', 'Alexandria', 'Obama', 'Republican', 'Democrat'];
var guessWord = document.getElementById('guess-word');

// Word class
// class Word {
//   constructor(word) {
//     this._word = word;
//   }
//
// }

// Create instance of new word
// const newWord = new Word(wordList(randomNumber))

// document.onkeyup = function(event) {
//
//   guessWord.innerText = 'This is a test!';
//
// }

function onClickNewWord() {
  var randomNumber= Math.floor( Math.random() * wordList.length );

  guessWord.innerText = wordList[randomNumber];
}
