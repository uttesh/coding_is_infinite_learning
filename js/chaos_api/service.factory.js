const ConfigService = require("./config.service");

let serviceRegistry = new Map();

const serviceClasses = {
  ConfigService,
};
class BaseServiceRegistry {
  getService(serviceName) {
    if (!serviceRegistry.get(serviceName)) {
      serviceRegistry.set(serviceName, new serviceClasses[serviceName]());
    }
    return serviceRegistry.get(serviceName);
  }
}

module.exports = BaseServiceRegistry;

class ServiceFactory {
  getService(serviceName) {
    return BaseServiceRegistry.getService(serviceName);
  }
}

module.exports = ServiceFactory;
