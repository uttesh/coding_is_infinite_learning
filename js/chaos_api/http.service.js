const fetch = require("node-fetch");

class HttpService {
  constructor() {}
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

  async post(url, data) {
    await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: populateData(),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      });
  }

  async getHeaders() {
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

let httpService = new HttpService();
httpService.get("http://google.com", "");
