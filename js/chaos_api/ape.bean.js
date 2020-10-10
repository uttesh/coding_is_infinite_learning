class ApeBean {
  constructor() {}

  setStatusList(statusList) {
    this.statusList = statusList;
  }

  getStatusList() {
    return this.statusList;
  }

  setField(field) {
    this.field = field;
  }
  getField() {
    return this.field;
  }

  setRequest(request) {
    this.request = request;
  }

  getRequest() {
    return this.request;
  }

  setReqBodyType(type) {
    this.reqBodyType = type;
  }

  getReqBodyType() {
    return this.reqBodyType;
  }

  setParamType(type) {
    this.paramType = type;
  }

  getParamType() {
    return this.paramType;
  }

  setParamValue(value) {
    this.paramValue = value;
  }

  getParamValue() {
    return this.paramValue;
  }
}

module.exports = ApeBean;
