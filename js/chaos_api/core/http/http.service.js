const fetch = require("node-fetch");
const Constants = require("../../common/constants");
const UtilityService = require("../../common/utility.service");
class HttpService {
  constructor(storeServiceInstance) {
    this.storeServiceInstance = storeServiceInstance;
    this.utilityService = new UtilityService();
    this.envList = [];
    this.storeServiceInstance.get(Constants.ENVS).then((data) => {
      this.envList = data;
    });
  }

  getStoreService() {
    return this.storeServiceInstance;
  }

  async get(url, option) {
    try {
      return await fetch(url)
        .then((res) => res.text())
        .then((body) => console.log(body))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }

  async post(request) {
    let requestOptions = { method: "POST" };
    let headers = this.getHeaders();
    if (request.auth) {
      headers["Authorization"] =
        request.auth.type + " " + (await this.getAuthHeader(request));
    }
    let requestObject = {};
    if (request.body) {
      let requestBody = request.body;
      switch (requestBody.mode) {
        case "raw":
          requestObject = JSON.parse(requestBody.raw);
          requestOptions.headers = await this.getHeaders();
          requestOptions.body = JSON.stringify(requestObject);
          break;
        case "urlencoded":
          headers["Content-Type"] =
            "application/x-www-form-urlencoded;charset=UTF-8";
          requestObject = JSON.parse(
            requestBody[Constants.CUSTOM_REQUEST_OBJECT]
          );
          requestOptions.headers = headers;
          requestOptions.body = JSON.stringify(requestObject);
          break;
        case "formdata":
          headers["Content-Type"] = "multipart/form-data";
          const formData = new FormData();
          formData.append("file", fileInput.files[0]);
          requestOptions.headers = await this.getHeaders();
          requestOptions.body = JSON.stringify(requestObject);
          break;
      }
    }
    let response = await fetch(this.getURL(request), requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log("then second res::", json);
        // console.log(json);
        return json;
      });
    return response;
  }

  async getAuthHeader(request) {
    if (request.auth.bearer && request.auth.bearer.length > 0) {
      let bearer = request.auth.bearer[0];
      if (bearer) {
        if (bearer.value && bearer.value.indexOf("{") != -1) {
          let orginalEnvKey = await this.utilityService.getEnvironmentKey(
            bearer.value
          );
          return this.getStoreService()
            .get(Constants.ENVS)
            .then(async (data) => {
              let keyObject = data.filter((item) => item.key === orginalEnvKey);
              if (keyObject && keyObject.length > 0) return keyObject[0].value;
            });
        } else {
          return bearer.value;
        }
      }
    }
  }

  getURL(request) {
    let url = request.url.raw;
    return this.utilityService.populateEnvValues("url", url, this.envList);
  }

  async getHeaders(request) {
    let headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    };
    return headers;
  }

  async populateData() {
    const data = {};
    return data;
  }

  async checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      let err = new Error(res.statusText);
      err.response = res;
      throw err;
    }
  }

  async extractResponse(res) {
    res.text(); // response body (=> Promise)
    res.json(); // parse via JSON (=> Promise)
    res.status; //=> 200
    res.statusText; //=> 'OK'
    res.redirected; //=> false
    res.ok; //=> true
    res.url; //=> 'https://example.com'
    res.type; //=> 'basic'
    //   ('cors' 'default' 'error'
    //    'opaque' 'opaqueredirect')
    res.headers.get("Content-Type");
  }
}

// let httpService = new HttpService();
// httpService.get("http://google.com", "");
module.exports = HttpService;
