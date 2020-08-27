class ParamBean {
  constructor() {}

  setBlank(data) {
    this.blank = data;
  }

  getBlank() {
    return this.blank;
  }

  setWord(word) {
    this.word = word;
  }

  getWord() {
    return this.word;
  }

  setAlphaNumeric(data) {
    this.alphaNumeric = data;
  }

  getAlphaNumeric() {
    return this.alphaNumeric;
  }

  setNumber(data) {
    this.number = data;
  }

  getNumber() {
    return this.number;
  }

  setParagraph(data) {
    this.paragraph = data;
  }

  getParagraph() {
    return this.paragraph;
  }

  setSpecialCharactors(data) {
    this.specialCharactors = data;
  }

  getSpecialCharactors() {
    return this.specialCharactors;
  }
}

module.exports = ParamBean;

// let paramBean = new ParamBean();
// paramBean.setNumber(123456);
// console.log(paramBean.getNumber());
