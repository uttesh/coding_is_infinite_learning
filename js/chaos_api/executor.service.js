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
    let fileds = await this.getAllRequestFields(request);
    console.log("fileds::: ", fileds);
    // Constants.Params.forEach((paramType) => {
    //   console.log("type:: ", paramType);
    //   // this.processRequestParamters(request, paramType);
    // });
  }

  async getAllRequestFields(request) {
    switch (request.method) {
      case "POST":
        let body = request.body;
        if (body.mode === "raw") {
          let rawObject = JSON.parse(body.raw);
          let fields = Object.keys(rawObject).join(",");
          return fields;
        }
        break;
      case "GET":
        let query = request.url.query;
        let fields = "";
        if (query) {
          query.forEach((item) => {
            fields = fields ? fields + "," + item.key : item.key;
          });
          return fields;
        }
        break;
      case "PUT":
        let putbody = request.body;
        if (putbody.mode === "raw") {
          let rawObject = JSON.parse(putbody.raw);
          let fields = Object.keys(rawObject).join(",");
          return fields;
        }
        break;
      case "DELETE":
        console.log("not support for now...");
        break;
    }
  }
}

let jsonFile =
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\simple-crud.postman_collection.json";
let executorService = new ExecutorService(jsonFile);
const exec = async () => {
  await executorService.init();
  await executorService.processAPIs();
};
exec();
