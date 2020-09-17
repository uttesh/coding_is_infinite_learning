const ParamUtilityService = require("./param.utility.service");
const StoreService = require("./store.service");
const HttpParserService = require("./http.parser.service");
const HttpService = require("./http.service");
const Constants = require("./constants");

class ExecutorService {
  constructor(apisFile, environmentFile) {
    this.apisFile = apisFile;
    this.environmentFile = environmentFile;
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
    await httpParserService.processJSONFile(this.apisFile, Constants.APIS);
    await httpParserService.processJSONFile(
      this.environmentFile,
      Constants.ENVS
    );
  }

  async processAPIs() {
    this.httpService = new HttpService(this.storeServiceInstance);
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
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        this.executePostRequest(request);
        break;
    }
    // Constants.Params.forEach((paramType) => {
    //   console.log("type:: ", paramType);
    //   // this.processRequestParamters(request, paramType);
    // });
  }

  async executePostRequest(request) {
    this.httpService.post(request);
  }

  async getAllRequestFields(request) {
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        let body = request.body;
        if (body.mode === "raw") {
          let rawObject = JSON.parse(body.raw);
          let fields = Object.keys(rawObject).join(",");
          return fields;
        }
        break;
      case Constants.HTTP_PARAMS.METHODS.GET:
        let query = request.url.query;
        let fields = "";
        if (query) {
          query.forEach((item) => {
            fields = fields ? fields + "," + item.key : item.key;
          });
          return fields;
        }
        break;
      case Constants.HTTP_PARAMS.METHODS.PUT:
        let putbody = request.body;
        if (putbody.mode === "raw") {
          let rawObject = JSON.parse(putbody.raw);
          let fields = Object.keys(rawObject).join(",");
          return fields;
        }
        break;
      case Constants.HTTP_PARAMS.METHODS.DELETE:
        break;
    }
  }
}

let jsonFile =
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\simple-crud.postman_collection.json";
let environmentFile =
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\simple-crud.postman_environment.json";
let executorService = new ExecutorService(jsonFile, environmentFile);
const exec = async () => {
  await executorService.init();
  await executorService.processAPIs();
};
exec();
