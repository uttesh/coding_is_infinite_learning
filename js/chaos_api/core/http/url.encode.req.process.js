const Constants = require("../../common/constants");
const BaseReqProcess = require("./base.req.process");

class URLEncodeReqProcess extends BaseReqProcess {
  constructor(storeServiceInstance, httpService) {
    super(storeServiceInstance, httpService);
  }

  async executeURLEncodeRequest(apeBean) {
    if (apeBean.getRequest().body) {
      apeBean.setReqBodyType(Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED);
      return await this.executeReqByApeValues(apeBean);
    }
  }

  populateRequestBody(apeBean) {
    // console.log(
    //   "in child url encode request body populateRequestBody class:: "
    // );
    let request = apeBean.getRequest();
    let urlencodedParams = apeBean.getRequest().body.urlencoded;
    let requestObj = {};
    urlencodedParams.forEach((item) => {
      requestObj[item.key] = item.value;
    });
    requestObj[apeBean.getField()] = apeBean.getParamValue();
    request.body[Constants.CUSTOM_REQUEST_OBJECT] = JSON.stringify(requestObj);
    apeBean.setRequest(request);
  }
}

module.exports = URLEncodeReqProcess;
