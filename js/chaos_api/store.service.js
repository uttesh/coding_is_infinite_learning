let dataMap;
class StoreService {
  constructor() {
    dataMap = new Map();
  }

  put(key, data) {
    dataMap[key] = data;
  }

  get(key) {
    return dataMap[key];
  }

  getAll() {
    return dataMap;
  }
}

module.exports = StoreService;
