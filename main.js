const input = require('sync-input');

let words = ['python', 'java', 'swift', 'javascript'];
const loserPhrase = 'You lost!';
const symbolHiddenLetter = '-';
const wrongLetter = "That letter doesn't appear in the word.";
const finishGame = 'Thanks for playing!';
const str = `Input a letter: `;
const usingLetter = "You've already guessed this letter.";
const singleLetter = 'Please, input a single letter.';
const lowerCase = 'Please, enter a lowercase letter from the English alphabet.';
const winnerPhrase = 'You survived!';
const startGame = 'Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:';

let winnerCount = 0;
let loserCount = 0;

function getRandomWord(words) {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord.toLowerCase();
}

function displayResults() {
    console.log(`You won: ${winnerCount} times\nYou lost: ${loserCount} times`);
}

function playGame() {
    let smallRandomWord = getRandomWord(words);
    let hiddenPhrase = symbolHiddenLetter.repeat(smallRandomWord.length);
    let arrWord = [...hiddenPhrase];
    let letterArr = [];

    console.log(`\n${hiddenPhrase}`);

    for (let j = 0; j < 8;) {
        let i = 0;
        let userPhrase = input(str);

        const warOne = letterArr.includes(userPhrase);
        let regex = /^[a-z]$/g;
        let letterHeight = regex.test(userPhrase);

        for (let letter of smallRandomWord) {
            if (letter === userPhrase) {
                arrWord[i] = letter;
            }
            i++;
        }

        if (userPhrase.length > 1 || userPhrase === '') {
            console.log(singleLetter);

        } else if (!letterHeight) {
            console.log(lowerCase);

        } else if (warOne) {
            console.log(usingLetter);

        } else if (!arrWord.includes(userPhrase)) {
            console.log(wrongLetter);
            j++;

        } else if (!arrWord.includes(symbolHiddenLetter)) {
            console.log(`You guessed the word ${arrWord.join('')}!\n${winnerPhrase}`);
            winnerCount++;
            break;
        }

        letterArr.push(userPhrase);
        console.log(`\n${arrWord.join('')}`);
    }

    if (arrWord.includes(symbolHiddenLetter)) {
        console.log(loserPhrase);
        loserCount++;
    }

    displayResults();
}

console.log('H A N G M A N');

while (true) {
    let userPhrase = input(startGame).trim().toLowerCase();
    if (userPhrase === 'play') {
        playGame();
    } else if (userPhrase === 'results') {
        displayResults();
    } else if (userPhrase === 'exit') {
        console.log(finishGame);
        break;
    }
}
