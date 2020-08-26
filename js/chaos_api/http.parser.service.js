var fs = require("fs");
const StoreService = require("./store.service");
const Constants = require("./constants");
let storeService;
class HttpParserService {
  constructor(storeInstance) {
    storeService = storeInstance;
  }

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
        storeService.put(Constants.APIS, apis);
      }
    });
  }

  async getAPI(itemList, requests) {
    itemList.forEach(async (element) => {
      if (element.request) {
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

module.exports = HttpParserService;

// let httpParserService = new HttpParserService(new StoreService());
// httpParserService.parsePostManJson(
//   "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\dit.postman_collection.json"
// );
