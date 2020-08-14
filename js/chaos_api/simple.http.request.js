const fetch = require("node-fetch");

async function httpGet(url, option) {
  try {
    return await fetch(url)
      .then((res) => res.text())
      .then((body) => console.log(body))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
}

async function httpPost(url, data) {
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

async function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };
  return headers;
}

async function populateData() {
  const data = {};
  return data;
}

async function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    let err = new Error(res.statusText);
    err.response = res;
    throw err;
  }
}

async function extractResponse(res) {
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

let res = httpGet("http://google.com", "");
