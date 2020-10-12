const StatusBean = require("../../bean/status.bean");
class BaseReqProcess {
  constructor(storeServiceInstance, httpService) {
    this.storeServiceInstance = storeServiceInstance;
    this.httpService = httpService;
  }

  getStoreService() {
    return this.storeServiceInstance;
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

  async executePostRequest(request) {
    return await this.httpService.post(request);
  }
}

module.exports = BaseReqProcess;
