class UtilityService {
  constructor() {}

  async getEnvironmentKey(envVariable) {
    return envVariable.substring(2, envVariable.length - 2);
  }

  populateEnvValues(inputType, input, envList) {
    switch (inputType) {
      case "url":
        let urlEnvParams = input
          .split("/")
          .filter((item) => item.indexOf("{") != -1);
        urlEnvParams.forEach((element) => {
          element = element.substring(2, element.length - 2);
          let Keyvalue = envList.filter((item) => item.key === element);
          if (Keyvalue[0]) {
            let keyData = "{{" + element + "}}";
            input = input.replace(keyData, Keyvalue[0].value);
          }
        });
        break;
      default:
    }
    return input;
  }
}

module.exports = UtilityService;
