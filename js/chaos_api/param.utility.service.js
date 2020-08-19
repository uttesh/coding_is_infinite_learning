const ConfigService = require("./config.service");
const WordGenerator = require("./word.generator");
const OtherData = require("./others.generator");
let configService, wordGenerator, otherData;
class ParamUtilityService {
  constructor(configServiceInstace, wordGeneratorInstace, otherDataInstance) {
    configService = configServiceInstace;
    wordGenerator = wordGeneratorInstace;
    otherData = otherDataInstance;
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

  getNumber(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    return otherData.generateNumber(length);
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
  new WordGenerator(),
  new OtherData()
);
let blankWord = paramTest.getBlankString("hulk");
console.log("blankWord: length: ", blankWord.length);

let singleWord = paramTest.getSingleWord("large");
console.log("singleWord: ", singleWord);

let paragraph = paramTest.getParagraph("large");
console.log("paragraph: ", paragraph);

let alphaNumeric = paramTest.getAlphaNumeric("large");
console.log("alphaNumeric: ", alphaNumeric);

let number = paramTest.getNumber("large");
console.log("number: ", number);
