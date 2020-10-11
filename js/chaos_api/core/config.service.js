const Constants = require("../common/constants");
class ConfigService {
  constructor() {}
  getParamLength(type) {
    let length = 0;
    switch (type) {
      case Constants.LengthTypes.SMALL.label:
        length = Constants.LengthTypes.SMALL.value;
        break;
      case Constants.LengthTypes.MEDIUM.label:
        length = Constants.LengthTypes.MEDIUM.value;
        break;
      case Constants.LengthTypes.BIG.label:
        length = Constants.LengthTypes.BIG.value;
        break;
      case Constants.LengthTypes.LARGE.label:
        length = Constants.LengthTypes.LARGE.value;
        break;
      case Constants.LengthTypes.HUGE.label:
        length = Constants.LengthTypes.HUGE.value;
        break;
      // case Constants.LengthTypes.HULK.label:
      //   length = Constants.LengthTypes.HULK.value;
      //   break;
    }
    return length;
  }
}

module.exports = ConfigService;
