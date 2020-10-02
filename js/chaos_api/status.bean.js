class StatusBean {
  constructor() {}

  setField(field) {
    this.field = field;
  }

  getField() {
    return this.field;
  }

  setValueType(type) {
    this.valueType = type;
  }

  getValuType() {
    return this.valueType;
  }

  setValueMode(mode) {
    this.valueMode = mode;
  }

  getValueMode() {
    return this.valueMode;
  }

  setRequestBody(req) {
    this.requestBody = req;
  }

  getRequetBody() {
    return this.requestBody;
  }

  setResponse(res) {
    this.response = res;
  }

  getResponse() {
    return this.response;
  }
}
module.exports = StatusBean;
