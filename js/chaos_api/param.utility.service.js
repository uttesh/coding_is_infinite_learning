const ConfigService = require("./config.service");
class ParamUtilityService {
  getBlankString() {
    console.log("imported : ", new ConfigService().getParamLength("small"));
    //let length = Math.floor(Math.random() * 1000) + 1;
  }
}

let paramTest = new ParamUtilityService();
paramTest.getBlankString();
