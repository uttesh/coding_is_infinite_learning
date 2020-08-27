const ParamUtilityService = require("./param.utility.service");
const StoreService = require("./store.service");
const Constants = require("./constants");
class ExecutorService {
  constructor() {}

  init() {
    let paramTest = new ParamUtilityService(new StoreService());
    Object.keys(Constants.LengthTypes).forEach((key) => {
      console.log("key::", key);
    });
    // paramTest.populateParamData("large");
  }
}

let executorService = new ExecutorService();
executorService.init();
