// Questions.
let Questions = [
    " 'Bears, _ _ _ _ _, Battlestar Galactica' -Dwight Schrute",
    " What office item of Dwight's did Jim put in jello? ",
    " Who are the group of kids Michael promised to pay tuition for? ",
    " Where does Michael go on his international business trip? ",
    " What is the brand name of the ladies suit Michael buys? ",
    " What is the name of Andy's college acapella group? ",
    " What is Michael's favorite pizza place in New York? ",
    " Which themed room did Jim and Pam stay in at Schrute Farms? ",
];
// Answers.
let wordBank = ["beets",
    "stapler",
    "scottstots",
    "canada",
    "missterious",
    "herecomestreble",
    "sbarro",
    "irrigation"];
// Pictures.
let data = [{
    word: "beets",
    questions: " 'Bears, _ _ _ _ _, Battlestar Galactica' -Dwight Schrute",
    image: "https://pbs.twimg.com/profile_images/549268771484229632/WnatiHzT_400x400.jpeg",
},
{
    word: "stapler",
    questions: "What office item of Dwight's did Jim put in jello?",
    image: "http://assets1.ignimgs.com/2015/10/03/jim-and-dwightjpg-9b2f98_1280w.jpg",
},
{
    word: "scotttots",
    questions: "Who are the group of kids Michael promised to pay tuition for?",
    image: "https://vignette.wikia.nocookie.net/theoffice/images/b/bb/Scott%27s_tots_newspaper2.jpg/revision/latest/scale-to-width-down/250?cb=20100303184059",
},
{
    word: "canada",
    questions: "Where does Michael go on his international business trip?",
    image: "https://vignette.wikia.nocookie.net/theoffice/images/0/0a/BusinessTrip.jpg/revision/latest?cb=20081121094915",
},
{
    word: "missterious",
    questions: "What is the brand name of the ladies suit Michael buys?",
    image: "https://i.redd.it/0dx600fvtniz.jpg",
},
{
    word: "herecomestreble",
    questions: "What is the name of Andy's college acapella group?",
    image: "https://www.insidehighered.com/sites/default/server_files/styles/medium/public/media/andybernardcornell.jpg?itok=pd883moX",
},
{
    word: "sbarro",
    questions: "What is Michael's favorite pizza place in New York?",
    image: "https://media1.tenor.com/images/da38c16617acee2a7b29130f80c8c872/tenor.gif?itemid=12693900",
},
{
    word: "irrigation",
    questions: "Which themed room did Jim and Pam stay in at Schrute Farms?",
    image: "https://i.pinimg.com/736x/46/e8/72/46e8729a01e340a19869ec01ef6cf574.jpg",
},
]
//data[currentWordIndex].questions
//data[currentWordIndex].wordBank
//data[currentWordIndex].images
//LOOK UP ARRAY OF OBJECTS
// Variables.
const maxTries = 10;
let guessedLetters = [];
let currentWordIndex;
let guessingWord = [];
let remainingGuesses = 0;       // Lives
let hasFinished = false;        // Flag    
let wins = 0;                   // Set Wins to Zero
let losses = 0;                 // Set Losses to Zero

// This function is needed upon start of the game and upon either meeting a Game Win or Game Lose condition
function resetGame() {
    remainingGuesses = maxTries;
    document.getElementById("startMsg").innerText = "Press any letter to play.";
    currentWordIndex = Math.floor(Math.random() * (wordBank.length));
    guessedLetters = [];
    guessingWord = [];
    for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    document.getElementById("Win").setAttribute("src", "");
    document.getElementById("Loss").setAttribute("src", "");
    updateGameContent();
};

// This function is needed to send to the html the updates and status of where we are in the game instance.
function updateGameContent() {

    document.getElementById("winCount").innerText = wins;
    document.getElementById("lossCount").innerText = losses;
    let guessingWordText = "";
    for (let i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    console.log("CurrentWord:", guessingWordText);
    console.log("GuessingWord:", guessingWord);
    console.log("CurrentWordIndex:", currentWordIndex);
    console.log("Questions:", wordBank[currentWordIndex]);
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingChances").innerText = remainingGuesses;
    document.getElementById("usedLetters").innerText = guessedLetters;
    document.getElementById("WorldsBestBoss").innerText = Questions[currentWordIndex];
};

// This function is called from within another function, letterPress(). It loops throught
// the length of the word to test all instances of the existing letter in the wordbank[n].
// I think this is the only way to say capture letters that repeat in the word such as the 'l' in malleus.
function evaluateGuess(letter) {
    // Array to store strArray of letters in string
    let strArray = [];
    console.log("Current Word Index :", currentWordIndex);
    // Loop through word finding all instances of guessed letter, store value in an array.
    for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
        if (wordBank[currentWordIndex][i] === letter) {
            strArray.push(i);
        }
    }

    if (strArray.length <= 0) {
        remainingGuesses--;
    } else {
        for (let i = 0; i < strArray.length; i++) {
            guessingWord[strArray[i]] = letter;
        }
    }
};
/*Following pair of functions are called firstly upon a keydown event and lastly after letter
evaluation logic has completed*/
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
        document.getElementById("startMsg").innerText = "Congratulations you are the World's Best Boss!";
        document.getElementById("Win").setAttribute("src", "https://img.business.com/rc/300x200/aHR0cHM6Ly93d3cuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2ltYWdlcy9pLzAwMC8wMDgvNjc4L29yaWdpbmFsL21pY2hhZWwtc2NvdHQtdGhlLW9mZmljZS5QTkc=");
    }
};


function checkLoss() {
    if (remainingGuesses <= 0) {
        hasFinished = true;
        losses++;
        document.getElementById("startMsg").innerText = "Congratulations on your epic fail!";
        document.getElementById("Loss").setAttribute("src", "https://media2.giphy.com/media/4A1am1JlzkJj2/giphy.gif");
        imageHeight = '500px';
        imageWidth = '100px';
    }
};

// Makes a guess
function letterPress(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

};

// Event listener
document.onkeydown = function (event) {
    // If we finished a game, dump one keystroke and reset.
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            letterPress(event.key.toLowerCase());
            updateGameContent();
            checkWin();
            checkLoss();
        }
    }
};    