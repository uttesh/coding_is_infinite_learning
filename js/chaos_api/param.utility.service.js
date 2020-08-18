const ConfigService = require("./config.service");
const WordGenerator = require("./word.generator");
let configService, wordGenerator;
class ParamUtilityService {
  constructor(configServiceInstace, wordGeneratorInstace) {
    configService = configServiceInstace;
    wordGenerator = wordGeneratorInstace;
  }

  getBlankString(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    return this.populateValues(length, " ");
  }

  getSingleWord(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    return wordGenerator.generateSingleWord(length);
  }

  getParagraph(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    return wordGenerator.generateParagraph(length);
  }

  getAlphaNumeric(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    return wordGenerator.generateAlphaNumeric(length);
  }

  populateValues(length, value) {
    let data = "";
    for (let i = 0; i < length; i++) {
      data = value + data;
    }
    return data;
  }

  getRandomWord(type) {}
}

let paramTest = new ParamUtilityService(
  new ConfigService(),
  new WordGenerator()
);
let blankWord = paramTest.getBlankString("hulk");
console.log("blankWord: length: ", blankWord.length);

let singleWord = paramTest.getSingleWord("large");
console.log("singleWord: ", singleWord);

let paragraph = paramTest.getParagraph("large");
console.log("paragraph: ", paragraph);

let alphaNumeric = paramTest.getAlphaNumeric("large");
console.log("alphaNumeric: ", alphaNumeric);
