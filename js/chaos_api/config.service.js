const Constants = require("./constants");
class ConfigService {
  constructor() {}
  getParamLength(type) {
    console.log("getParamLength : ", type);
    let length = 0;
    switch (type) {
      case Constants.LengthTypes.SMALL:
        length = 10;
        break;
      case Constants.LengthTypes.MEDIUM:
        length = 50;
        break;
      case Constants.LengthTypes.BIG:
        length = 200;
        break;
      case Constants.LengthTypes.LARGE:
        length = 1000;
        break;
      case Constants.LengthTypes.HUGE:
        length = 10000;
        break;
      case Constants.LengthTypes.HULK:
        length = 100000;
        break;
    }
    return length;
  }
}

module.exports = ConfigService;
