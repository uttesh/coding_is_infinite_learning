const StoreService = require("../common/store.service");
const Constants = require("../common/constants");
const HttpService = require("./http/http.service");
const RawRequestBodyProcess = require("./http/raw.reqbody.process");
const URLEncodeReqProcess = require("./http/url.encode.req.process");
const FormDataReqBodyProcess = require("./http/formdata.reqbody.process");
const ApeBean = require("../bean/ape.bean");
class RequestExecutor {
  constructor(storeServiceInstance) {
    this.storeServiceInstance = storeServiceInstance;
    this.httpService = new HttpService(this.storeServiceInstance);
  }
  getStoreService() {
    return this.storeServiceInstance;
  }
  async execteRequest(requestBean, request, statusList) {
    if (requestBean && requestBean.fields && requestBean.fields.length > 0) {
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
            apeBean = await this.processRequest(apeBean);
            if (apeBean) {
              statusList.push(apeBean.getStatusList());
            }
          }
        }
      }
    }
  }

  async processRequest(apeBean) {
    if (apeBean.getRequest().body) {
      let requestBody = apeBean.getRequest().body;
      console.log("requestBody.mode : ", requestBody.mode);
      switch (requestBody.mode) {
        case Constants.HTTP_REQUEST.BODY_TYPE.RAW:
          let rawRequestBodyProcess = new RawRequestBodyProcess(
            this.getStoreService(),
            this.httpService
          );
          return rawRequestBodyProcess.executeRawRequest(apeBean);
        case Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED:
          let urlEncodeReqProcess = new URLEncodeReqProcess(
            this.getStoreService(),
            this.httpService
          );
          return urlEncodeReqProcess.executeURLEncodeRequest(apeBean);
        case Constants.HTTP_REQUEST.BODY_TYPE.FORM_DATA:
          let formDataReqBodyProcess = new FormDataReqBodyProcess(
            this.getStoreService(),
            this.httpService
          );
          return formDataReqBodyProcess.executeFormDataRequest(apeBean);
      }
    }
  }
}

module.exports = RequestExecutor;
