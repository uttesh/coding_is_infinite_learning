const Constants = require("../../common/constants");
const RequestBean = require("../../bean/request.bean");
class RequestFieldProcess {
  constructor() {}

  async getAllRequestFields(request) {
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        return this.extractPostRequest(request);
      case Constants.HTTP_PARAMS.METHODS.GET:
        return this.extractGetRequest(request);
      case Constants.HTTP_PARAMS.METHODS.PUT:
        return this.extractPutRequest(request);
      case Constants.HTTP_PARAMS.METHODS.DELETE:
        break;
    }
  }

  extractPutRequest(request) {
    let putbody = request.body;
    if (putbody.mode === Constants.HTTP_REQUEST.BODY_TYPE.RAW) {
      let rawObject = JSON.parse(putbody.raw);
      let fields = Object.keys(rawObject).join(",");
      let requestBean = new RequestBean(rawObject, fields);
      return requestBean;
    }
    return null;
  }

  extractGetRequest(request) {
    let query = request.url.query;
    let fields = "";
    if (query) {
      query.forEach((item) => {
        fields = fields ? fields + "," + item.key : item.key;
      });
      let requestBean = new RequestBean(query, fields);
      return requestBean;
    }
    return null;
  }

  extractPostRequest(request) {
    let body = request.body;
    if (body.mode === Constants.HTTP_REQUEST.BODY_TYPE.RAW) {
      return this.extractRawRequest(body);
    } else if (body.mode === Constants.HTTP_REQUEST.BODY_TYPE.URL_ENCODED) {
      return this.extractURLEncodeRequest(body);
    } else if (body.mode === Constants.HTTP_REQUEST.BODY_TYPE.FORM_DATA) {
      return this.extractFormDataRequest(body);
    }
  }

  extractRawRequest(body) {
    let rawObject = JSON.parse(body.raw);
    let fields = Object.keys(rawObject).join(",");
    let requestBean = new RequestBean(rawObject, fields);
    return requestBean;
  }

  extractURLEncodeRequest(body) {
    let rawObjects = body.urlencoded;
    let fields = rawObjects.map((item) => item.key).join(",");
    let requestObj = {};
    rawObjects.forEach((item) => {
      requestObj[item.key] = item.value;
    });
    let requestBean = new RequestBean(requestObj, fields);
    return requestBean;
  }
  extractFormDataRequest(body) {
    let rawObjects = body.formdata;
    let fields = rawObjects.map((item) => item.key).join(",");
    let requestObj = {};
    rawObjects.forEach((item) => {
      requestObj[item.key] = item.type === "file" ? item.src : item.value;
    });
    let requestBean = new RequestBean(requestObj, fields);
    return requestBean;
  }
}
module.exports = RequestFieldProcess;
