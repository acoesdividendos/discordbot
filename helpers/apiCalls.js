var Request = require("request");
const cheerio = require("cheerio");
const got = require("got");
const https = require("https");
const fs = require("fs");

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
exports.getTopMovers = function () {
  var promise = new Promise(function (resolve, reject) {
    var returnArray = [];
    getTopGainersTickers().then((arrayReturn) => {
      arrayReturn.forEach((ticker) => {
        var financeURL =
          "https://query1.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=Qukd0bPvSA6&lang=en-US&region=US&symbols=" +
          ticker +
          "&fields=messageBoardId%2ClongName%2CshortName%2CmarketCap%2CunderlyingSymbol%2CunderlyingExchangeSymbol%2CheadSymbolAsString%2CregularMarketPrice%2CregularMarketChange%2CregularMarketChangePercent%2CregularMarketVolume%2Cuuid%2CregularMarketOpen%2CfiftyTwoWeekLow%2CfiftyTwoWeekHigh%2CtoCurrency%2CfromCurrency%2CtoExchange%2CfromExchange&corsDomain=finance.yahoo.com";

        Request.get(financeURL, function (err, response) {
          if (err) {
            console.log(err);
            reject({
              message: "Erro de validação de login egoi",
              messageType: "error",
            });
          } else {
            if (response.body.length) {
              const element = JSON.parse(response.body).quoteResponse.result[0];
              const returnObject = {
                ticker: element.symbol,
                companyName: element.shortName,
                lastPrice: element.regularMarketPreviousClose.fmt,
                price: element.regularMarketPrice.fmt,
                percentualChange: element.regularMarketChange.fmt + "%",
              };
              returnArray.push(returnObject);
              if (arrayReturn[arrayReturn.length - 1] == ticker) {
                returnArray.sort(function (a, b) {
                  return (
                    arrayReturn.indexOf(a.ticker) -
                    arrayReturn.indexOf(b.ticker)
                  );
                });
                resolve(returnArray);
              }
            } else {
              reject({
                message: "Erro de validação de login egoi",
                messageType: "error",
              });
            }
          }
        });
      });
    });
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
exports.getLosersMovers = function () {
  var promise = new Promise(function (resolve, reject) {
    var returnArray = [];
    getTopLosersTickers().then((arrayReturn) => {
      arrayReturn.forEach((ticker) => {
        var financeURL =
          "https://query1.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=Qukd0bPvSA6&lang=en-US&region=US&symbols=" +
          ticker +
          "&fields=messageBoardId%2ClongName%2CshortName%2CmarketCap%2CunderlyingSymbol%2CunderlyingExchangeSymbol%2CheadSymbolAsString%2CregularMarketPrice%2CregularMarketChange%2CregularMarketChangePercent%2CregularMarketVolume%2Cuuid%2CregularMarketOpen%2CfiftyTwoWeekLow%2CfiftyTwoWeekHigh%2CtoCurrency%2CfromCurrency%2CtoExchange%2CfromExchange&corsDomain=finance.yahoo.com";

        Request.get(financeURL, function (err, response) {
          if (err) {
            console.log(err);
            reject({
              message: "Erro de validação de login egoi",
              messageType: "error",
            });
          } else {
            if (response.body.length) {
              const element = JSON.parse(response.body).quoteResponse.result[0];
              const returnObject = {
                ticker: element.symbol,
                companyName: element.shortName,
                lastPrice: element.regularMarketPreviousClose.fmt,
                price: element.regularMarketPrice.fmt,
                percentualChange: element.regularMarketChange.fmt + "%",
              };
              returnArray.push(returnObject);
              if (arrayReturn[arrayReturn.length - 1] == ticker) {
                returnArray.sort(function (a, b) {
                  return (
                    arrayReturn.indexOf(a.ticker) -
                    arrayReturn.indexOf(b.ticker)
                  );
                });
                resolve(returnArray);
              }
            } else {
              reject({
                message: "Erro de validação de login egoi",
                messageType: "error",
              });
            }
          }
        });
      });
    });
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
exports.getMostActives = function () {
  var promise = new Promise(function (resolve, reject) {
    var returnArray = [];
    getMostActivesTickers().then((arrayReturn) => {
      arrayReturn.forEach((ticker) => {
        var financeURL =
          "https://query1.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=Qukd0bPvSA6&lang=en-US&region=US&symbols=" +
          ticker +
          "&fields=messageBoardId%2ClongName%2CshortName%2CmarketCap%2CunderlyingSymbol%2CunderlyingExchangeSymbol%2CheadSymbolAsString%2CregularMarketPrice%2CregularMarketChange%2CregularMarketChangePercent%2CregularMarketVolume%2Cuuid%2CregularMarketOpen%2CfiftyTwoWeekLow%2CfiftyTwoWeekHigh%2CtoCurrency%2CfromCurrency%2CtoExchange%2CfromExchange&corsDomain=finance.yahoo.com";

        Request.get(financeURL, function (err, response) {
          if (err) {
            console.log(err);
            reject({
              message: "Erro de validação de login egoi",
              messageType: "error",
            });
          } else {
            if (response.body.length) {
              const element = JSON.parse(response.body).quoteResponse.result[0];
              const returnObject = {
                ticker: element.symbol,
                companyName: element.shortName,
                lastPrice: element.regularMarketPreviousClose.fmt,
                price: element.regularMarketPrice.fmt,
                percentualChange: element.regularMarketChange.fmt + "%",
              };
              returnArray.push(returnObject);
              if (arrayReturn[arrayReturn.length - 1] == ticker) {
                returnArray.sort(function (a, b) {
                  return (
                    arrayReturn.indexOf(a.ticker) -
                    arrayReturn.indexOf(b.ticker)
                  );
                });
                resolve(returnArray);
              }
            } else {
              reject({
                message: "Erro de validação de login egoi",
                messageType: "error",
              });
            }
          }
        });
      });
    });
  });
  return promise;
};

exports.getTrendingTickers = function () {
  var promise = new Promise(function (resolve, reject) {
    var returnArray = [];
    getMostTrendingTickers().then((arrayReturn) => {
      arrayReturn.forEach((ticker) => {
        var financeURL =
          "https://query1.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=Qukd0bPvSA6&lang=en-US&region=US&symbols=" +
          ticker +
          "&fields=messageBoardId%2ClongName%2CshortName%2CmarketCap%2CunderlyingSymbol%2CunderlyingExchangeSymbol%2CheadSymbolAsString%2CregularMarketPrice%2CregularMarketChange%2CregularMarketChangePercent%2CregularMarketVolume%2Cuuid%2CregularMarketOpen%2CfiftyTwoWeekLow%2CfiftyTwoWeekHigh%2CtoCurrency%2CfromCurrency%2CtoExchange%2CfromExchange&corsDomain=finance.yahoo.com";

        Request.get(financeURL, function (err, response) {
          if (err) {
            console.log(err);
            reject({
              message: "Erro de validação de login egoi",
              messageType: "error",
            });
          } else {
            if (response.body.length) {
              const element = JSON.parse(response.body).quoteResponse.result[0];
              const returnObject = {
                ticker: element.symbol,
                companyName: element.shortName,
                lastPrice: element.regularMarketPreviousClose.fmt,
                price: element.regularMarketPrice.fmt,
                percentualChange: element.regularMarketChange.fmt + "%",
              };
              returnArray.push(returnObject);
              if (arrayReturn[arrayReturn.length - 1] == ticker) {
                returnArray.sort(function (a, b) {
                  return (
                    arrayReturn.indexOf(a.ticker) -
                    arrayReturn.indexOf(b.ticker)
                  );
                });
                resolve(returnArray);
              }
            } else {
              reject({
                message: "Erro de validação de login egoi",
                messageType: "error",
              });
            }
          }
        });
      });
    });
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
exports.getArrayFromFile = function (file) {
  var promise = new Promise(function (resolve, reject) {
    fs.readFileSync(file, (err, data) => {
      if (err) throw err;
      resolve(JSON.parse(data).array);
    });
  }).then((data) => {
    console.log(data);
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
exports.writeIDtoFile = function (file, array, id) {
  var promise = new Promise(function (resolve, reject) {
    console.log(id);
    array.push(id);
    console.log(array);
    let data = JSON.stringify({ array: array }, null);
    fs.writeFile(file, data, (err) => {
      if (err) throw err;
      resolve();
    });
  });
  return promise;
};

exports.getCurrentPrice = function (ticker) {
  var promise = new Promise(function (resolve, reject) {
    var stockInfoURL =
      "https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=" +
      ticker +
      "&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1";

    Request.get(stockInfoURL, function (err, response) {
      if (err) {
        console.log(err);
      }
      var marketStatus = JSON.parse(response.body).FormattedQuoteResult
        .FormattedQuote[0].curmktstatus;
      var currentPrice = 0;
      var percentChange = 0;
      if (marketStatus == "POST_MKT") {
        currentPrice = JSON.parse(response.body).FormattedQuoteResult
          .FormattedQuote[0].ExtendedMktQuote.last;
        percentChange = JSON.parse(response.body).FormattedQuoteResult
          .FormattedQuote[0].ExtendedMktQuote.change_pct;
      }
      if(marketStatus == "PRE_MKT"){
        currentPrice = JSON.parse(response.body).FormattedQuoteResult
          .FormattedQuote[0].ExtendedMktQuote.last;
        percentChange = JSON.parse(response.body).FormattedQuoteResult
          .FormattedQuote[0].ExtendedMktQuote.change_pct;
      }
      if(marketStatus == "REG_MKT"){
        currentPrice = JSON.parse(response.body).FormattedQuoteResult
          .FormattedQuote[0].last;
        percentChange = JSON.parse(response.body).FormattedQuoteResult
          .FormattedQuote[0].change_pct;
      }
      resolve({
        currentValue: "$".concat(currentPrice),
        percentChange: percentChange,
        marketStatus: marketStatus
      });
    });
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
getMostActivesTickers = function () {
  var promise = new Promise(function (resolve, reject) {
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
        resolve(arrayReturn);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
getMostTrendingTickers = function () {
  var promise = new Promise(function (resolve, reject) {
    const vgmUrl = "https://finance.yahoo.com/trending-tickers";
    var varZero = 0;
    var arrayReturn = [];
    got(vgmUrl)
      .then((response) => {
        const $ = cheerio.load(response.body);
        $("table > tbody > tr > td").each((i, link) => {
          if (varZero == i) {
            arrayReturn.push($(link).text());
            varZero = varZero + 12;
          }
        });
        resolve(arrayReturn);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
getTopGainersTickers = function () {
  var promise = new Promise(function (resolve, reject) {
    const vgmUrl = "https://finance.yahoo.com/gainers";
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
        resolve(arrayReturn);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return promise;
};

//FUNCAO PARA VERIFICAR LOGIN NO EGOI
getTopLosersTickers = function () {
  var promise = new Promise(function (resolve, reject) {
    const vgmUrl = "https://finance.yahoo.com/losers";
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
        resolve(arrayReturn);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return promise;
};
