const ConfigService = require("./config.service");
const WordGenerator = require("./word.generator");
const OtherData = require("./others.generator");
const StoreService = require("./store.service");
const Params = require("./constants");
let configService, wordGenerator, otherData, storeService;
class ParamUtilityService {
  constructor(
    configServiceInstace,
    wordGeneratorInstace,
    otherDataInstance,
    storeInstance
  ) {
    configService = configServiceInstace;
    wordGenerator = wordGeneratorInstace;
    otherData = otherDataInstance;
    storeService = storeInstance;
  }

  populateParamData(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    storeService.put(Params.BLANK, this.populateValues(length, " "));
    storeService.put(Params.WORD, this.generateSingleWord(length));
    storeService.put(Params.PARAGRAPH, this.generateSingleWord(length));
    storeService.put(Params.NUMBER, this.generateNumber(length));
    console.log("stored Data: ", storeService.getAll());
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
  new OtherData(),
  new StoreService()
);
paramTest.populateParamData("large");
// let blankWord = paramTest.getBlankString("hulk");
// console.log("blankWord: length: ", blankWord.length);

// let singleWord = paramTest.getSingleWord("large");
// console.log("singleWord: ", singleWord);

// let paragraph = paramTest.getParagraph("large");
// console.log("paragraph: ", paragraph);

// let alphaNumeric = paramTest.getAlphaNumeric("large");
// console.log("alphaNumeric: ", alphaNumeric);

// let number = paramTest.getNumber("large");
// console.log("number: ", number);
