const ConfigService = require("./config.service");
const WordGenerator = require("./word.generator");
const OtherData = require("./others.generator");
const StoreService = require("./store.service");
const Constants = require("./constants");
let configService, wordGenerator, otherData, storeService;
class ParamUtilityService {
  constructor(storeInstance) {
    configService = new ConfigService();
    wordGenerator = new WordGenerator();
    otherData = new OtherData();
    storeService = storeInstance;
  }

  populateParamData(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    console.log("length:: ", length);
    storeService.put(Constants.Params.BLANK, this.populateValues(length, " "));
    storeService.put(
      Constants.Params.WORD,
      wordGenerator.generateSingleWord(length)
    );
    storeService.put(
      Constants.Params.PARAGRAPH,
      wordGenerator.generateParagraph(length)
    );
    storeService.put(Constants.Params.NUMBER, otherData.generateNumber(length));
    storeService.put(
      Constants.Params.ALPHA_NUMERIC,
      wordGenerator.generateAlphaNumeric(length)
    );
    console.log("stored Data: ", storeService.getAll());
  }

  populateValues(length, value) {
    let data = "";
    for (let i = 0; i < length; i++) {
      data = value + data;
    }
    return data;
  }
}

let paramTest = new ParamUtilityService(new StoreService());
paramTest.populateParamData("large");
