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
      const response = await this.executeRequest(apeBean.getRequest());
      await this.populateStatus(apeBean, paramKeys[pk], response);
    }
    return apeBean;
  }

  async populateTestFileValues(paramBean) {
    Object.keys(Constants.TEST_FILES).forEach((key) => {
      // console.log("Key : ", key);
      paramBean[key] = Constants.TEST_FILES[key];
      // console.log("Value : ", Constants.TEST_FILES[key]);
    });
  }

  populateRequestBody(apeBean) {
    let request = apeBean.getRequest();
    let formdataParams = apeBean.getRequest().body.formdata;
    let requestObj = {};
    formdataParams.forEach((item) => {
      requestObj[item.key] = item.key;
    });
    requestObj[apeBean.getField()] = apeBean.getParamValue();
    request.body[Constants.CUSTOM_REQUEST_OBJECT] = JSON.stringify(requestObj);
    apeBean.setRequest(request);
  }
}

module.exports = FormDataReqBodyProcess;
