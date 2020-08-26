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
        console.log(":: postManObject ::", postManObject);
      }
    });
  }
}

let httpParserService = new HttpParserService();
httpParserService.parsePostManJson(
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\dit.postman_collection.json"
);
