class RequestBean {
  constructor(request, fields) {
    this.request = request;
    this.fields = fields;
  }

  getReqeust() {
    return this.request;
  }

  getFields() {
    return this.fields;
  }
}

module.exports = RequestBean;
