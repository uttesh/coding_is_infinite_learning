const ParamUtilityService = require("./core/param.utility.service");
const StoreService = require("./common/store.service");
const HttpParserService = require("./http.parser.service");
const HttpService = require("./http.service");
const Constants = require("./common/constants");
const RequestBean = require("./bean/request.bean");
const StatusBean = require("./bean/status.bean");
const ApeBean = require("./bean/ape.bean");
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
    let statusList = [];
    for (let i = 0; i < requests.length; i++) {
      await this.execteRequest(requests[i], statusList);
    }
    // console.log("Status list of all executions :: ", statusList);
  }

  async execteRequest(request, statusList) {
    let requestBean = await this.getAllRequestFields(request);
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        if (
          requestBean &&
          requestBean.fields &&
          requestBean.fields.length > 0
        ) {
          const fields = requestBean.fields.split(",");
          for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field) {
              const paramTypes = Object.keys(Constants.LengthTypes);
              for (let p = 0; p < paramTypes.length; p++) {
                let apeBean = new ApeBean();
                apeBean.setStatusList(statusList);
                apeBean.setRequest(request);
                apeBean.setField(field);
                apeBean.setParamType(Constants.LengthTypes[paramTypes[p]]);
                await this.processPostRequestFieldValue(apeBean);
              }
            }
          }
        }
        break;
    }
  }

  async populateStatus(apeBean, valueType, response) {
    const statusBean = new StatusBean();
    statusBean.setField(apeBean.getField());
    statusBean.setValueMode(apeBean.getParamType());
    statusBean.setValueType(valueType);
    statusBean.setRequestBody(apeBean.getRequest());
    statusBean.setResponse(response);
    apeBean.getStatusList().push(statusBean);
  }

  async processPostRequestFieldValue(apeBean) {
    if (apeBean.getRequest().body) {
      let requestBody = apeBean.getRequest().body;
      switch (requestBody.mode) {
        case Constants.HTTP_REQUEST.BODY_TYPE.RAW:
          apeBean.setReqBodyType(Constants.HTTP_REQUEST.BODY_TYPE.RAW);
          this.executeReqByApeValues(apeBean);
          break;
        case Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED:
          apeBean.setReqBodyType(Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED);
          this.executeReqByApeValues(apeBean);
          break;
      }
    }
  }

  async executeReqByApeValues(apeBean) {
    let paramBean = await this.getStoreService().get(
      "PARAM_" + apeBean.getParamType().label
    );
    const paramKeys = Object.keys(paramBean);
    for (let pk = 0; pk < paramKeys.length; pk++) {
      apeBean.setParamValue(paramBean[paramKeys[pk]]);
      this.populateRequestBody(apeBean);
      const response = await this.executePostRequest(apeBean.getRequest());
      this.populateStatus(apeBean, paramKeys[pk], response);
    }
  }

  populateRequestBody(apeBean) {
    let requestObject = {};
    let type = apeBean.getReqBodyType();
    let request = apeBean.getRequest();
    if (type === Constants.HTTP_REQUEST.BODY_TYPE.RAW) {
      requestObject = JSON.parse(apeBean.getRequest().body[type]);
      requestObject[apeBean.getField()] = apeBean.getParamValue();
      request.body[type] = JSON.stringify(requestObject);
      apeBean.setRequest(request);
    } else if (type === Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED) {
      let urlencodedParams = apeBean.getRequest().body.urlencoded;
      let requestObj = {};
      urlencodedParams.forEach((item) => {
        requestObj[item.key] = item.value;
      });
      requestObj[apeBean.getField()] = apeBean.getParamValue();
      request.body[Constants.CUSTOM_REQUEST_OBJECT] = JSON.stringify(
        requestObj
      );
      apeBean.setRequest(request);
    }
  }

  async executePostRequest(request) {
    return await this.httpService.post(request);
  }

  async getAllRequestFields(request) {
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        let body = request.body;
        if (body.mode === Constants.HTTP_REQUEST.BODY_TYPE.RAW) {
          let rawObject = JSON.parse(body.raw);
          let fields = Object.keys(rawObject).join(",");
          let requestBean = new RequestBean(rawObject, fields);
          return requestBean;
        } else if (body.mode === Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED) {
          let rawObjects = body.urlencoded;
          let fields = rawObjects.map((item) => item.key).join(",");
          let requestObj = {};
          rawObjects.forEach((item) => {
            requestObj[item.key] = item.value;
          });
          let requestBean = new RequestBean(requestObj, fields);
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
        if (putbody.mode === Constants.HTTP_REQUEST.BODY_TYPE.RAW) {
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
