const fs = require("fs");
const cheerio = require("cheerio");
const got = require("got");

const vgmUrl = "https://finance.yahoo.com/most-active";
var varZero = 0;
var arrayReturn = [];
got(vgmUrl)
  .then((response) => {
    const $ = cheerio.load(response.body);
    $("table > tbody > tr > td").each((i, link) => {
      if (varZero == i) {
        arrayReturn.push($(link).text());
        varZero = varZero + 10;
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
