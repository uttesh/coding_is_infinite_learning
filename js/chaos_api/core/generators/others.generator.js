class OtherData {
  constructor() {}

  generateNumber(length) {
    let data = "";
    for (let i = 0; i < length; i++) {
      data = Math.floor(Math.random() * 9) + 1 + data;
    }
    return data;
  }

  getSpecialCharacters() {
    return `~!@#$%^&*()_|+\-=?;:'",.<>\{}[]/]`;
  }
}

module.exports = OtherData;
