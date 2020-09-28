const ParamUtilityService = require("./param.utility.service");
const StoreService = require("./store.service");
const HttpParserService = require("./http.parser.service");
const HttpService = require("./http.service");
const Constants = require("./constants");
const RequestBean = require("./request.bean");
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
    let requests = await this.getStoreService().get(Constants.APIS);
    console.log("requests :: ", requests.length);
    for (let i = 0; i < requests.length; i++) {
      await this.execteRequest(requests[i]);
    }
  }

  async execteRequest(request) {
    let requestBean = await this.getAllRequestFields(request);
    console.log("requestBean::: ", requestBean);
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        if (requestBean.fields && requestBean.fields.length > 0) {
          requestBean.fields.split(",").forEach((field) => {
            if (field) {
              console.log("field :: ", field);
              Object.keys(Constants.LengthTypes).forEach((paramType) => {
                this.processPostRequestFieldValue(
                  request,
                  field,
                  Constants.LengthTypes[paramType]
                );
              });
              // this.executePostRequest(request);
            }
          });
        }

        break;
    }
  }

  async processPostRequestFieldValue(request, field, type) {
    if (request.body) {
      let requestObject = {};
      let requestBody = request.body;
      switch (requestBody.mode) {
        case "raw":
          requestObject = JSON.parse(requestBody.raw);
          // console.log("requestObject :: ", requestObject);
          console.log("type :: ", "PARAM_" + type.label);
          let paramBean = await this.getStoreService().get(
            "PARAM_" + type.label
          );
          console.log("paramBean :: ", paramBean);
          break;
      }
    }
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
          let requestBean = new RequestBean(rawObject, fields);
          return requestBean;
        }
        break;
      case Constants.HTTP_PARAMS.METHODS.GET:
        let query = request.url.query;
        let fields = "";
        if (query) {
          query.forEach((item) => {
            fields = fields ? fields + "," + item.key : item.key;
          });
          let requestBean = new RequestBean(query, fields);
          return requestBean;
        }
        break;
      case Constants.HTTP_PARAMS.METHODS.PUT:
        let putbody = request.body;
        if (putbody.mode === "raw") {
          let rawObject = JSON.parse(putbody.raw);
          let fields = Object.keys(rawObject).join(",");
          let requestBean = new RequestBean(rawObject, fields);
          return requestBean;
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
