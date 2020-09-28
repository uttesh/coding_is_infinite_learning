let dataMap;
class StoreService {
  constructor() {
    dataMap = new Map();
  }

  async put(key, data) {
    dataMap[key] = data;
  }

  async get(key) {
    return dataMap[key];
  }

  async getAllKeys() {
    return dataMap.keys();
  }

  async getAll() {
    return dataMap;
  }
}

module.exports = StoreService;
