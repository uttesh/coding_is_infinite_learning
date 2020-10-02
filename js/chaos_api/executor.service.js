const ParamUtilityService = require("./param.utility.service");
const StoreService = require("./store.service");
const HttpParserService = require("./http.parser.service");
const HttpService = require("./http.service");
const Constants = require("./constants");
const RequestBean = require("./request.bean");
const StatusBean = require("./status.bean");
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
    let statusList = [];
    for (let i = 0; i < requests.length; i++) {
      await this.execteRequest(requests[i], statusList);
    }
  }

  async execteRequest(request, statusList) {
    let requestBean = await this.getAllRequestFields(request);
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        if (requestBean.fields && requestBean.fields.length > 0) {
          const fields = requestBean.fields.split(",");
          for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field) {
              const paramTypes = Object.keys(Constants.LengthTypes);
              for (let p = 0; p < paramTypes.length; p++) {
                await this.processPostRequestFieldValue(
                  statusList,
                  request,
                  field,
                  Constants.LengthTypes[paramTypes[p]]
                );
              }
            }
          }
        }
        break;
    }
  }

  async populateStatus(statusList, request, field, type, paramType, reposne) {
    let statusBean = new StatusBean();
    statusBean.setField(field);
    statusBean.setValueMode(type);
    statusBean.setValueType(paramType);
    statusBean.setRequestBody(request);
    statusBean.setResponse(reposne);
    console.log("statusBean :: ", statusBean);
    statusList.push(statusBean);
  }

  async processPostRequestFieldValue(statusList, request, field, type) {
    if (request.body) {
      let requestBody = request.body;
      switch (requestBody.mode) {
        case "raw":
          let paramBean = await this.getStoreService().get(
            "PARAM_" + type.label
          );
          const paramKeys = Object.keys(paramBean);
          for (let pk = 0; pk < paramKeys.length; pk++) {
            let requestObject = {};
            requestObject = JSON.parse(requestBody.raw);
            requestObject[field] = paramBean[paramKeys[pk]];
            requestBody.raw = JSON.stringify(requestObject);
            request.body = requestBody;
            let response = await this.executePostRequest(request);
            await this.populateStatus(
              statusList,
              request,
              field,
              type.label,
              paramKeys[pk],
              response
            );
          }
          break;
      }
    }
  }

  async executePostRequest(request) {
    await this.httpService.post(request);
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
