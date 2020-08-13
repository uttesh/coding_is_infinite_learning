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

function generate(words) {
  let paragraph = "";
  for (let i = 0; i < words; i++) {
    paragraph = getRandomWord() + " " + paragraph;
  }
  console.log("paragraph: ", paragraph);
}

function getRandomWord() {
  let wordLength = Math.floor(Math.random() * 10) + 1;
  let randomWord = "";
  for (let i = 0; i < wordLength; i++) {
    let randomAlphabet = Math.floor(Math.random() * 26) + 1;
    randomWord = alphabets[randomAlphabet] + randomWord;
  }
  return randomWord;
}

generate(100);
