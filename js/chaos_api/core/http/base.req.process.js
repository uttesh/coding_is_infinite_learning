const StatusBean = require("../../bean/status.bean");
const Constants = require("../../common/constants");
class BaseReqProcess {
  constructor(storeServiceInstance, httpService) {
    this.storeServiceInstance = storeServiceInstance;
    this.httpService = httpService;
  }

  getStoreService() {
    return this.storeServiceInstance;
  }

  async executeReqByApeValues(apeBean) {
    // console.log("inbase class:: ");
    let paramBean = await this.getStoreService().get(
      "PARAM_" + apeBean.getParamType().label
    );
    const paramKeys = Object.keys(paramBean);
    for (let pk = 0; pk < paramKeys.length; pk++) {
      apeBean.setParamValue(paramBean[paramKeys[pk]]);
      this.populateRequestBody(apeBean);
      const response = await this.executeRequest(apeBean.getRequest());
      await this.populateStatus(apeBean, paramKeys[pk], response);
    }
    return apeBean;
  }

  async populateStatus(apeBean, valueType, response) {
    const statusBean = new StatusBean();
    statusBean.setField(apeBean.getField());
    statusBean.setValueMode(apeBean.getParamType());
    statusBean.setValueType(valueType);
    statusBean.setRequestBody(apeBean.getRequest());
    statusBean.setResponse(response);
    let statusList = apeBean.getStatusList();
    statusList.push(statusBean);
    apeBean.setStatusList(statusList);
    return apeBean;
  }

  async executeRequest(request) {
    let requestOptions = { method: "POST" };
    if (request.method === Constants.HTTP_PARAMS.METHODS.PUT) {
      requestOptions = { method: "PUT" };
    }
    if (request.method === Constants.HTTP_PARAMS.METHODS.DELETE) {
      requestOptions = { method: "DELETE" };
    }
    return await this.httpService.execute(request, requestOptions);
  }
}

module.exports = BaseReqProcess;
