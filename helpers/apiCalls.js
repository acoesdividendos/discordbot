var Request = require("request");
const cheerio = require("cheerio");
const got = require("got");
const https = require("https");

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

exports.getLastestTweet = function () {
  var promise = new Promise(function (resolve, reject) {
    var returnArray = [];
    Request.get(
      "https://api.twitter.com/2/users/1368593986106109957/tweets",
      function (err, response) {
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
                  arrayReturn.indexOf(a.ticker) - arrayReturn.indexOf(b.ticker)
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
      }
    );
  });
  return promise;
};
