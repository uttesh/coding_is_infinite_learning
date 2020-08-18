class ConfigService {
  constructor() {}
  getParamLength(type) {
    console.log("getParamLength : ", type);
    let length = 0;
    switch (type) {
      case "small":
        length = 10;
        break;
      case "medium":
        length = 50;
        break;
      case "big":
        length = 200;
        break;
      case "large":
        length = 1000;
        break;
      case "huge":
        length = 10000;
        break;
      case "hulk":
        length = 100000;
        break;
    }
    return length;
  }
}

module.exports = ConfigService;
