const ParamUtilityService = require("./param.utility.service");
const StoreService = require("./store.service");
const HttpParserService = require("./http.parser.service");
const Constants = require("./constants");
class ExecutorService {
  constructor(jsonFile) {
    this.jsonFile = jsonFile;
  }

  async init() {
    let storeService = new StoreService();
    // let paramTest = new ParamUtilityService(storeService);
    // Object.keys(Constants.LengthTypes).forEach((key) => {
    //   paramTest.populateParamData(key.toLocaleLowerCase());
    // });
    let httpParserService = new HttpParserService(storeService);
    console.log("this.jsonFile:: ", this.jsonFile);
    await httpParserService.parsePostManJson(this.jsonFile).then((data) => {
      console.log("promise :: ", storeService.getAll());
    });
  }

  processAPIs() {}
}

let jsonFile =
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\dit.postman_collection.json";
let executorService = new ExecutorService(jsonFile);
executorService.init();
