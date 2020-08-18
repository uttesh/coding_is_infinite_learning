const ConfigService = require("./config.service");
let configService;
class ParamUtilityService {
  constructor(configServiceInstace) {
    configService = configServiceInstace;
  }

  getBlankString(type) {
    let length =
      Math.floor(Math.random() * configService.getParamLength(type)) + 1;
    return this.populateValues(length, " ");
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

let paramTest = new ParamUtilityService(new ConfigService());
let blankWord = paramTest.getBlankString("hulk");
console.log("blankWord: length: ", blankWord.length);
