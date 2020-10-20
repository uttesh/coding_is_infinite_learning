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

  async executeReqByApeValues(apeBean) {
    // console.log("inbase class:: ");
    let paramBean = await this.getStoreService().get(
      "PARAM_" + apeBean.getParamType().label
    );
    this.populateTestFileValues(paramBean);
    const paramKeys = Object.keys(paramBean);
    for (let pk = 0; pk < paramKeys.length; pk++) {
      apeBean.setParamValue(paramBean[paramKeys[pk]]);
      this.populateRequestBody(apeBean);
      const response = await this.executePostRequest(apeBean.getRequest());
      await this.populateStatus(apeBean, paramKeys[pk], response);
    }
    return apeBean;
  }

  async populateTestFileValues(paramBean) {
    Object.keys(Constants.TEST_FILES).forEach((key) => {
      console.log("Key : ", key);
      console.log("Value : ", Constants.TEST_FILES[key]);
    });
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
