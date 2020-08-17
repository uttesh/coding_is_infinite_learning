const ConfigService = require("./config.service");
let configService;
class ParamUtilityService {
  constructor(configServiceInstace) {
    configService = configServiceInstace;
  }

  getBlankString(type) {
    console.log("from abstration : ", configService.getParamLength("small"));
    //let length = Math.floor(Math.random() * 1000) + 1;
  }
}

let paramTest = new ParamUtilityService(new ConfigService());
paramTest.getBlankString();
