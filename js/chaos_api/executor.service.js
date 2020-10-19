const ParamUtilityService = require("./core/param.utility.service");
const StoreService = require("./common/store.service");
const HttpParserService = require("./core/http/http.parser.service");
const HttpService = require("./core/http/http.service");
const Constants = require("./common/constants");
const ApeBean = require("./bean/ape.bean");
const RawRequestBodyProcess = require("./core/http/raw.reqbody.process");
const URLEncodeReqProcess = require("./core/http/url.encode.req.process");
const RequestFieldProcess = require("./core/http/req.fields.process");
const FormDataReqBodyProcess = require("./core/http/formdata.reqbody.process");

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
    let requestFieldProcess = new RequestFieldProcess();
    let requestBean = await requestFieldProcess.getAllRequestFields(request);
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
                apeBean = await this.processPostRequest(apeBean);
                if (apeBean) {
                  statusList.push(apeBean.getStatusList());
                }
              }
            }
          }
        }
        break;
    }
  }

  async processPostRequest(apeBean) {
    if (apeBean.getRequest().body) {
      let requestBody = apeBean.getRequest().body;
      console.log("requestBody.mode : ", requestBody.mode);
      switch (requestBody.mode) {
        // case Constants.HTTP_REQUEST.BODY_TYPE.RAW:
        //   let rawRequestBodyProcess = new RawRequestBodyProcess(
        //     this.getStoreService(),
        //     this.httpService
        //   );
        //   return rawRequestBodyProcess.executeRawRequest(apeBean);
        // case Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED:
        //   let urlEncodeReqProcess = new URLEncodeReqProcess(
        //     this.getStoreService(),
        //     this.httpService
        //   );
        //   return urlEncodeReqProcess.executeURLEncodeRequest(apeBean);
        case Constants.HTTP_REQUEST.BODY_TYPE.FORM_DATA:
          let formDataReqBodyProcess = new FormDataReqBodyProcess(
            this.getStoreService(),
            this.httpService
          );
          return formDataReqBodyProcess.executeFormDataRequest(apeBean);
      }
    }
  }

  async executePostRequest(request) {
    return await this.httpService.post(request);
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
