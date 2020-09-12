const fetch = require("node-fetch");
const Constants = require("./constants");
class HttpService {
  constructor(storeServiceInstance) {
    this.storeServiceInstance = storeServiceInstance;
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
    console.log(request);
    let headers = this.getHeaders();
    if (request.auth) {
      // headers["Authorization"] =
      //   request.auth.type + " " + JSON.stringify(request.auth.bearer[0]);
      this.getAuthHeader(request);
    }
    console.log("auth header::", headers);
    // await fetch(request.url, {
    //   method: "POST",
    //   headers: getHeaders(request),
    //   body: populateData(),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     console.log(json);
    //   });
  }

  async getAuthHeader(request) {
    console.log("request.auth.bearer :: ", request.auth.bearer);
    if (request.auth.bearer.length > 0) {
      let bearer = request.auth.bearer[0];
      if (bearer) {
        console.log("bearer: value", bearer.value);
        if (bearer.value && bearer.value.indexOf("{") != -1) {
          let orginalEnvKey = bearer.value.substring(
            2,
            bearer.value.length - 2
          );
          console.log("orginalEnvKey:: ", orginalEnvKey);
          this.getStoreService()
            .get(Constants.ENVS)
            .then(async (data) => {
              console.log("data :: ", data);
              for (let i = 0; i < data.length; i++) {
                console.log("env data :::", data[i]);
              }
            });
          // console.log("getStoreService:: ", this.getStoreService().get());
        }
      }
    }
  }

  async getHeaders(request) {
    const headers = {
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
