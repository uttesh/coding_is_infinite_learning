var fs = require("fs");
class HttpParserService {
  constructor() {}

  async parsePostManJson(postmanFile) {
    let jsonData = await this.readPostmanFile(postmanFile);
    console.log("jsonData :: ", jsonData);
    let postManObject = JSON.parse(jsonData);
    console.log(":: postManObject ::", postManObject);
  }

  async readPostmanFile(filePath) {
    console.log("filePath:: ", filePath);
    return fs.readFile(filePath, async (err, data) => {
      console.log("data :: ", data);
      return data;
    });
  }
}

let httpParserService = new HttpParserService();
httpParserService.parsePostManJson(
  "C:dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\dit.postman_collection.json"
);
