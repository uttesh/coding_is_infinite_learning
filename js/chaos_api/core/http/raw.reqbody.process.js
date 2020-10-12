const Constants = require("../../common/constants");
const BaseReqProcess = require("./base.req.process");

class RawRequestBodyProcess extends BaseReqProcess {
  constructor(storeServiceInstance, httpService) {
    super(storeServiceInstance, httpService);
  }

  async executeRawRequest(apeBean) {
    if (apeBean.getRequest().body) {
      apeBean.setReqBodyType(Constants.HTTP_REQUEST.BODY_TYPE.RAW);
      return await this.executeReqByApeValues(apeBean);
    }
  }

  populateRequestBody(apeBean) {
    // console.log("in child raw request body populateRequestBody class:: ");
    let requestObject = {};
    let request = apeBean.getRequest();
    requestObject = JSON.parse(apeBean.getRequest().body.raw);
    requestObject[apeBean.getField()] = apeBean.getParamValue();
    request.body.raw = JSON.stringify(requestObject);
    apeBean.setRequest(request);
  }
}

module.exports = RawRequestBodyProcess;
