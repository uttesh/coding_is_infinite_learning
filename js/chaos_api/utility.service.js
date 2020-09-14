class UtilityService {
  constructor() {}

  async getEnvironmentKey(envVariable) {
    return envVariable.substring(2, envVariable.length - 2);
  }
}

module.exports = UtilityService;
