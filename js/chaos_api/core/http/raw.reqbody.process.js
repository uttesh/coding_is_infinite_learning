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

  async executeReqByApeValues(apeBean) {
    let paramBean = await this.getStoreService().get(
      "PARAM_" + apeBean.getParamType().label
    );
    const paramKeys = Object.keys(paramBean);
    for (let pk = 0; pk < paramKeys.length; pk++) {
      apeBean.setParamValue(paramBean[paramKeys[pk]]);
      this.populateRequestBody(apeBean);
      const response = await this.executePostRequest(apeBean.getRequest());
      await this.populateStatus(apeBean, paramKeys[pk], response);
    }
    return apeBean;
  }

  populateRequestBody(apeBean) {
    let requestObject = {};
    let type = apeBean.getReqBodyType();
    let request = apeBean.getRequest();
    requestObject = JSON.parse(apeBean.getRequest().body[type]);
    requestObject[apeBean.getField()] = apeBean.getParamValue();
    request.body[type] = JSON.stringify(requestObject);
    apeBean.setRequest(request);
  }
}

module.exports = RawRequestBodyProcess;
