var wordList = ['Columbia', 'Dupont', 'Alexandria', 'Obama', 'Republican',
  'Democrat'
];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
var gameWord = document.getElementById('game-word');
var letterArr = [];


// Word class
class Letter {
  constructor(letter) {
    this._letter = letter.toUpperCase();
    this._isGuessed = false;
    this._isInWord = false;
  }

  get letter() {
    return this._letter;
  }

  get isGuessed() {
    return this._isGuessed;
  }

  get isInWord() {
    return this._isInWord;

  }
  // This creates a new letter and defines the div element in which the
  // the character will reside
  letterHolder() {
    // Create new <div>
    var newDiv = document.createElement('div');
    newDiv.className = 'letter-holder letter-off m-1 col-sm-1';
    // Acccess 'i' letter of hangman word/phrase
    var newLetter = document.createTextNode(this._letter);
    // Append letter onto new tag
    newDiv.appendChild(newLetter);
    // Place letter in new div tag to game-word ID
    var letterPosition = gameWord;
    letterPosition.appendChild(newDiv);
  }
  letterGuessed(replaceDiv) {
    replaceDiv.className = 'letter-holder letter-on m-1 col-sm-1';
  }
}

function onClickNewWord() {
  letterArr = [];
  // Remove any child element in game-word ID
  while (gameWord.firstChild) {
    gameWord.removeChild(gameWord.firstChild);
  }

  // New random number to access random word in wordList
  var randomNumber = Math.floor(Math.random() * wordList.length);
  newWord = wordList[randomNumber];

  for (var i = 0; i < newWord.length; i++) {
    // Create instance of new letter
    const newLetter = new Letter(newWord[i]);
    newLetter.letterHolder();
    newLetter._isInWord = true;
    letterArr.push(newLetter);
  }

  document.onkeyup = function(event) {
    var userGuess = event.key.toUpperCase();

    for (var j = 0; j < letterArr.length; j++) {

      if (userGuess === letterArr[j]._letter) {
        letterArr[j]._isGuessed = true;
        letterArr[j].letterGuessed(document.getElementsByClassName('letter-holder')[j]);
      }
      // console.log(document.getElementsByClassName('letter-holder')[j]);
//
      // console.log(letterArr[j]._letter, userGuess, letterArr[j]._isGuessed);


    }
  }
}
