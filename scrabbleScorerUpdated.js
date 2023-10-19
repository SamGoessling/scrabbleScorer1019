// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
//cleaned up code October 16th 2023 Sam Goessling all tests passed and words scored correctly
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const newPointStructure = transform(oldPointStructure);

function transform(oldStructure) {
  const newStructure = {};
  for (const score in oldStructure) {
    for (const letter of oldStructure[score]) {
      newStructure[letter.toLowerCase()] = parseInt(score);
    }
  }
  return newStructure;
}


function initialPrompt() {
  return input.question("Let's play some Scrabble!\n\nPlease enter a word to score: ");
}

const word = initialPrompt();

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function simpleScorer(word) {
  let score = word.length;
  return score;
}

function vowelBonusScorer(word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  word = word.toLowerCase();
  let score = 0; 

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3; // Add 3 points for vowels.
    } else {
      score += 1; // Add 1 point for consonants.
    }
  }
  return score;
}

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];

    if (newPointStructure.hasOwnProperty(letter)) {
      score += newPointStructure[letter];
    }
  }
  return score;
}

const scoringAlgorithms = [
  {
    name: "Simple Scorer",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels Scorer",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "New Scrabble Scorer",
    description: "The traditional new scoring algorithm.",
    scorerFunction: scrabbleScorer,
  }
];

function scorerPrompt(word) {
  console.log("Available Scoring Algorithms:\n");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i}: ${scoringAlgorithms[i].name}`);
  }

  let choice = input.question("Please select a scoring algorithm by entering 0, 1, or 2: ");
  choice = parseInt(choice);

  if (choice >= 0 && choice < scoringAlgorithms.length) {
    const selectedAlgorithm = scoringAlgorithms[choice];
    console.log(`Algorithm name: ${selectedAlgorithm.name}`);
    const score = selectedAlgorithm.scorerFunction(word);
    console.log(`Score for '${word}': ${score}`);
    return selectedAlgorithm;
  } else {
    console.log("Invalid choice. Please select 0, 1, or 2.");
    return null;
  }
}

function runProgram() {
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};