const ParamUtilityService = require("./param.utility.service");
const StoreService = require("./store.service");
const HttpParserService = require("./http.parser.service");
const Constants = require("./constants");
class ExecutorService {
  constructor(jsonFile) {
    this.jsonFile = jsonFile;
    this.storeServiceInstance = new StoreService();
  }

  getStoreService() {
    return this.storeServiceInstance;
  }

  async init() {
    let paramTest = new ParamUtilityService(this.getStoreService());
    Object.keys(Constants.LengthTypes).forEach((key) => {
      paramTest.populateParamData(key.toLocaleLowerCase());
    });
    let httpParserService = new HttpParserService(this.getStoreService());
    await httpParserService.processJSONFile(this.jsonFile, Constants.APIS);
  }

  async processAPIs() {
    this.getStoreService()
      .get(Constants.APIS)
      .then(async (data) => {
        for (let i = 0; i < data.length; i++) {
          await this.execteRequest(data[i]);
        }
      });
  }

  async execteRequest(request) {
    console.log("request: ", request);
    console.log("------------");
  }
}

let jsonFile =
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\dit.postman_collection.json";
let executorService = new ExecutorService(jsonFile);
const exec = async () => {
  await executorService.init();
  await executorService.processAPIs();
};
exec();
