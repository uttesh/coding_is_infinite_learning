const Constants = Object.freeze({
  Params: {
    BLANK: "BLANK",
    WORD: "WORD",
    ALPHA_NUMERIC: "ALPHA_NUMERIC",
    NUMBER: "NUMBER",
    PARAGRAPH: "PARAGRAPH",
    SPECIAL_CHARACTERS: "SPECIAL_CHARACTERS",
  },
  LengthTypes: {
    SMALL: { label: "small", value: 10 },
    // MEDIUM: { label: "medium", value: 50 },
    // BIG: { label: "big", value: 200 },
    // LARGE: { label: "large", value: 1000 },
    // HUGE: { label: "huge", value: 10000 },

    // HULK: { label: "hulk", value: 20000 },
  },
  APIS: "APIS",
  ENVS: "ENVS",
  HTTP_PARAMS: {
    METHODS: {
      POST: "POST",
      GET: "GET",
      PUT: "PUT",
      DELETE: "DELETE",
    },
  },
});

module.exports = Constants;
