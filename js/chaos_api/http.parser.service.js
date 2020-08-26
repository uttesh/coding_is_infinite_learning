var fs = require("fs");
class HttpParserService {
  constructor() {}

  async parsePostManJson(postmanFile) {
    await this.processJSONFile(postmanFile);
  }

  async processJSONFile(filePath) {
    console.log("filePath:: ", filePath);
    fs.readFile(filePath, async (err, data) => {
      if (data) {
        let postManObject = JSON.parse(data);
        let items = postManObject.item;
        let apis = [];
        apis = await this.getAPI(items, apis);
        console.log("all apis :: ", apis.length);
      }
    });
  }

  async getAPI(itemList, requests) {
    itemList.forEach(async (element) => {
      if (element.request) {
        console.log("element.request :: ", element.name);
        requests.push(element.request);
      } else {
        if (element.item) {
          await this.getAPI(element.item, requests);
        }
      }
    });
    return requests;
  }
}

let httpParserService = new HttpParserService();
httpParserService.parsePostManJson(
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\dit.postman_collection.json"
);
