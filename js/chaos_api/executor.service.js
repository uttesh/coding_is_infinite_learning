const ParamUtilityService = require("./core/param.utility.service");
const StoreService = require("./common/store.service");
const HttpParserService = require("./core/http/http.parser.service");
const HttpService = require("./core/http/http.service");
const Constants = require("./common/constants");
const RequestFieldProcess = require("./core/http/req.fields.process");
const PostRequestExecutor = require("./core/execute.post.request");

class ExecutorService {
  constructor(apisFile, environmentFile) {
    this.apisFile = apisFile;
    this.environmentFile = environmentFile;
    this.storeServiceInstance = new StoreService();
  }

  getStoreService() {
    return this.storeServiceInstance;
  }

  async init() {
    let paramTest = new ParamUtilityService(this.getStoreService());
    Object.keys(Constants.LengthTypes).forEach((key) => {
      paramTest.populateParamData(key.toLocaleLowerCase());
    });
    let httpParserService = new HttpParserService(this.getStoreService());
    await httpParserService.processJSONFile(this.apisFile, Constants.APIS);
    await httpParserService.processJSONFile(
      this.environmentFile,
      Constants.ENVS
    );
  }

  async processAPIs() {
    this.httpService = new HttpService(this.storeServiceInstance);
    let requests = await this.getStoreService().get(Constants.APIS);
    let statusList = [];
    for (let i = 0; i < requests.length; i++) {
      await this.execteRequest(requests[i], statusList);
    }
    // console.log("::::Status list of all executions :: ", statusList);
  }

  async execteRequest(request, statusList) {
    let requestFieldProcess = new RequestFieldProcess();
    let requestBean = await requestFieldProcess.getAllRequestFields(request);
    switch (request.method) {
      case Constants.HTTP_PARAMS.METHODS.POST:
        const postRequestExecutor = new PostRequestExecutor(
          this.storeServiceInstance
        );
        await postRequestExecutor.execteRequest(
          requestBean,
          request,
          statusList
        );
        break;
    }
  }
}

let jsonFile =
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\simple-crud.postman_collection.json";
let environmentFile =
  "C:\\dev\\clients\\me\\coding_is_infinite_learning\\js\\chaos_api\\simple-crud.postman_environment.json";
let executorService = new ExecutorService(jsonFile, environmentFile);
const exec = async () => {
  await executorService.init();
  await executorService.processAPIs();
};
exec();
