// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

let newPointStructure = {};

function runProgram() {
   transform(oldPointStructure);
   scorerPrompt();  
}

function initialPrompt() {
   const word = input.question("Let's play some scrabble! Enter a word: ");
   const selection = input.question("Select scoring: Enter 1 for simple, 2 for vowel, 3 for Scrabble: ");
   scorerPrompt(selection);
};

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelPointStructure = {
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M,', 'N', 'P', 'Q', 'R', 'S', 'T',
  'V', 'W', 'X', 'Y', 'Z'],
  3: ['A', 'E', 'I', 'O', 'U'],
};

function scrabbleScore(word) {
	word = word.toUpperCase();
  word = word.trim();
	let letterPoints = 0;
  letterPoints = Number(letterPoints);

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue)
		 }
 
	  }
	}
	return letterPoints;
 }

let oldScrabbleScorerFunc = scrabbleScore;

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function simpleScore(word) {
	word = word.toUpperCase();
  word = word.trim();
	let simplePoints = 0;
  simplePoints = Number(simplePoints);
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			simplePoints += 1
		 }
 
	  }
	}
	return simplePoints;
 }

let simpleScorerFunc = simpleScore;

function vowelBonusScore(word) {
	word = word.toUpperCase();
  
  let vowelPoints = 0;
  vowelPoints = Number(vowelPoints);

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelPointStructure) {
 
		 if (vowelPointStructure[pointValue].includes(word[i])) {
      vowelPoints += Number(pointValue)
		 }
 
	  }
	}
	return vowelPoints;
 }

let vowelBonusScorerFunc = vowelBonusScore;

let simpleScorer = {
 name: "Simple Score",
 description: "Each letter is worth 1 point",
 scoreFunction: simpleScorerFunc
};

let vowelBonusScorer = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt",
  scoreFunction: vowelBonusScorerFunc
};

let scrabbleScorer = {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scoreFunction: oldScrabbleScorerFunc
};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt() {
  const word = input.question("Let's play some scrabble! Enter a word: ");
  const selection = input.question("Select scoring: Enter 0 for simple, 1 for vowel, 2 for Scrabble: ");
  console.log("Algorithm name:", scoringAlgorithms[selection].name)
  console.log(`Score for ${word}:`, scoringAlgorithms[selection].scoreFunction(word))
}

function transform(pointStructure){
  for (property in pointStructure) {
    for (let i in pointStructure[property]){
      newPointStructure[oldPointStructure[property][i].toLowerCase()] = property;
    }
  }
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};