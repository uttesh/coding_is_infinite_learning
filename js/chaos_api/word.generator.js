const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

class WordGenerator {
  constructor() {}
  generateSingleWord(length) {
    return this.generateWord(length);
  }
  generateParagraph(legnth) {
    let paragraph = "";
    for (let i = 0; i < legnth; i++) {
      paragraph = this.getRandomWord() + " " + paragraph;
    }
    return paragraph;
  }

  getRandomWord() {
    let wordLength = Math.floor(Math.random() * 10) + 1;
    return this.generateWord(wordLength);
  }

  generateWord(wordLength) {
    let randomWord = "";
    for (let i = 0; i < wordLength; i++) {
      let randomAlphabet = Math.floor(Math.random() * 26) + 1;
      randomWord = alphabets[randomAlphabet] + randomWord;
    }
    return randomWord;
  }

  generateAlphaNumeric(wordLength) {
    let randomWord = "";
    for (let i = 0; i < wordLength; i++) {
      let randomAlphabet = Math.floor(Math.random() * 26) + 1;
      let randomNumeric = Math.floor(Math.random() * 9) + 1;
      randomWord = alphabets[randomAlphabet] + randomNumeric + randomWord;
    }
    return randomWord;
  }
}

// let wordGenerator = new WordGenerator();
// let singleWord = wordGenerator.generateSingleWord(100);
// console.log("singleWord::: ", singleWord);

// let paragraphs = wordGenerator.generateParagraph(100);
// console.log("paragraphs::: ", paragraphs);

// let alphaNumeric = wordGenerator.generateAlphaNumeric(4);
// console.log("alphaNumeric::: ", alphaNumeric);
module.exports = WordGenerator;
