var wordList = ['Columbia', 'Dupont', 'Alexandria', 'Obama', 'Republican',
  'Democrat'
];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
var gameWord = document.getElementById('game-word');

var randomNumber;

// Word class
class Letter {
  constructor(letter) {
    this._letter = letter;
    this._isGuessed = false;
  }

  get letter() {
    return this._letter;
  }

  get isGuessed() {
    return this._isGuessed;
  }

  isVisible() {
    if (this._isGuessed) {
      // set attribute to visible
    } else {
      // set attribute to invisble
    }
  }

  createNewLetter() {
    // Create new <div>
    var newDiv = document.createElement('div');
    newDiv.className = 'letter-holder col-sm-1';
    // Acccess 'i' letter of hangman word/phrase
    var newLetter = document.createTextNode(this._letter);
    // Append letter onto new tag
    newDiv.appendChild(newLetter);
    // Place letter in new div tag to game-word ID
    var letterPosition = gameWord;
    letterPosition.appendChild(newDiv);
    }
  }

function onClickNewWord() {

  // Remove any child element in game-word ID
  while (gameWord.firstChild) {
    gameWord.removeChild(gameWord.firstChild);
  }

  // New random number to access random word in wordList
  randomNumber = Math.floor(Math.random() * wordList.length);
  var newWord = wordList[randomNumber];

  for (var i = 0; i < newWord.length; i++)
  {
    // Create instance of new letter
    const newLetter = new Letter(newWord[i]);
    newLetter.createNewLetter();

  }

  console.log(newWord);
}
