let symbols = {
    '@': '%40',
    '&amp;': '%26',
    '*': '%2A',
    '+': '%2B',
    '/': '%2F',
    '&lt;': '%3C',
    '&gt;': '%3E'
};
let email = "uttesh+prod@rivetsys.com";
let str = email.replace(/([@*+/]|&(amp|lt|gt);)/g, function (m) { return symbols[m]; });

console.log('str: '+str);