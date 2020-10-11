var fs = require("fs");
const Constants = require("./common/constants");
let storeService;
class HttpParserService {
  constructor(storeInstance) {
    storeService = storeInstance;
  }

  async parsePostManJson(postmanFile) {
    await this.processJSONFile(postmanFile, Constants.APIS);
  }

  async processJSONFile(filePath, type) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, async (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          let postManObject = JSON.parse(data);
          if (type === Constants.APIS) {
            let items = postManObject.item;
            let apis = [];
            apis = await this.getAPI(items, apis);
            await storeService.put(Constants.APIS, apis);
            resolve(data);
          }
          if (type === Constants.ENVS) {
            await storeService.put(Constants.ENVS, postManObject.values);
            resolve(data);
          }
        }
      });
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
