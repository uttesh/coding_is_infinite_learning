const Constants = require("../../common/constants");
const BaseReqProcess = require("./base.req.process");

class FormDataReqBodyProcess extends BaseReqProcess {
  constructor(storeServiceInstance, httpService) {
    super(storeServiceInstance, httpService);
  }

  async executeFormDataRequest(apeBean) {
    if (apeBean.getRequest().body) {
      apeBean.setReqBodyType(Constants.HTTP_REQUEST.BODY_TYPE.FORM_DATA);
      return await this.executeReqByApeValues(apeBean);
    }
  }

  populateRequestBody(apeBean) {
    let request = apeBean.getRequest();
    let formdataParams = apeBean.getRequest().body.formdata;
    console.log("formdataParams :: ", formdataParams);
    let requestObj = {};
    formdataParams.forEach((item) => {
      console.log("item :: ", item);
      requestObj[item.key] = item.key;
    });
    console.log("apeBean.getField() :: ", apeBean.getField());
    console.log("apeBean.getParamValue() :: ", apeBean.getParamValue());
    requestObj[apeBean.getField()] = apeBean.getParamValue();
    request.body[Constants.CUSTOM_REQUEST_OBJECT] = JSON.stringify(requestObj);
    apeBean.setRequest(request);
  }
}

module.exports = FormDataReqBodyProcess;
