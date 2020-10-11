const ConfigService = require("./config.service");
const WordGenerator = require("./word.generator");
const OtherData = require("./others.generator");
const Constants = require("./common/constants");
const ParamBean = require("./bean/param.bean");
let configService, wordGenerator, otherData, storeService;
class ParamUtilityService {
  constructor(storeInstance) {
    configService = new ConfigService();
    wordGenerator = new WordGenerator();
    otherData = new OtherData();
    storeService = storeInstance;
  }

  populateParamData(type) {
    let paramBean = new ParamBean();
    const length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    paramBean.setBlank(this.populateValues(length, " "));
    paramBean.setWord(wordGenerator.generateSingleWord(length));
    paramBean.setParagraph(wordGenerator.generateParagraph(length));
    paramBean.setNumber(otherData.generateNumber(length));
    paramBean.setAlphaNumeric(wordGenerator.generateAlphaNumeric(length));
    storeService.put("PARAM_" + type, paramBean);
  }

  populateValues(length, value) {
    let data = "";
    for (let i = 0; i < length; i++) {
      data = value + data;
    }
    return data;
  }
}
module.exports = ParamUtilityService;
