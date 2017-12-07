var wordList = ['hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon',
  'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aliminium',
  'silicon', 'chlorine', 'argon', 'potassium', 'calcium'
];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
var gameWord = document.getElementById('game-word');

var winCountElement = document.getElementById('win-count');
var wins = 0;
var lossCountElement = document.getElementById('loss-count');
var losses = 0;
var guessesLeft = document.getElementById('guesses-left');
var countDown = 0;
var letterGuessed = document.getElementById('letters-guessed');

// Word class
class Letter {
  // Can I call a method inside a method inside an object
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
  letterOn(replaceDiv) {
    replaceDiv.className = 'letter-holder letter-on m-1 col-sm-1';
  }
  letterOff(replaceDiv) {
    replaceDiv.className = 'letter-holder letter-off m-1 col-sm-1';
  }
}

var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "Assets/audio/spooky-rush.m4a");
function playAudio() {
  audioElement.play();
}
function pauseAudio() {
  audioElement.pause();
}

var newWord;
function onClickNewWord() {
  pauseAudio();

  countDown = 7;
  guessesLeft.innerText = countDown;

  var countCorrectGuess = 0;
  var countIncorrectGuess = 0;

  var letterArr = [];

  // Remove any child element in game-word ID
  while (gameWord.firstChild) {
    gameWord.removeChild(gameWord.firstChild);
  }

  while (letterGuessed.firstChild) {
    letterGuessed.removeChild(letterGuessed.firstChild);
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

  var userGuess;
  document.onkeyup = function(event) {
    userGuess = event.key.toUpperCase();

    var correctGuess = false;

    for (var j = 0; j < letterArr.length; j++) {

      if (userGuess === letterArr[j]._letter &&
        letterArr[j]._isGuessed === false) {

        letterArr[j]._isGuessed = true;
        letterArr[j].letterOn(document.getElementsByClassName('letter-holder')[j]);

        countCorrectGuess++;

        correctGuess = true;
      }
    }

    if (correctGuess != true) {
      countIncorrectGuess++;
      countDown -= 1;
      guessesLeft.innerText = countDown;

      if (countIncorrectGuess > 4)
      {
        playAudio();
      }
    }

    if (countCorrectGuess === newWord.length) {
      console.log('Winner!');
      wins++;
      winCountElement.innerText = wins;
      alert('Winner! the word is: ' + newWord.toUpperCase());
      onClickNewWord();
      return;
      // play some awesome music
    }

    // 7 incorrect guesses and YOU LOSE!
    if (countIncorrectGuess >= 7) {
      console.log('Loser');
      losses++;
      lossCountElement.innerText = losses;
      alert('You lose! the word was: ' + newWord.toUpperCase());
      onClickNewWord();
      return;
      // play loser music
    }
    // Display letters guessed.
    var newEl = document.createElement('div');
    newEl.className = 'h3 ml-1'
    var newGuess = document.createTextNode(userGuess + ' /');
    newEl.appendChild(newGuess);
    letterGuessed.appendChild(newEl);
  }
}
