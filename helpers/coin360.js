var Twit = require("twit");
const got = require("got");
const fs = require("fs");
const request = require("request");
const Discord = require("discord.js");
var dateFormat = require("dateformat");
var config = require("../config.json");
var twitterAPI = require("./twitterAPI");
const client = new Discord.Client();

var T = new Twit({
  /*consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET,*/
  consumer_key: config.DEMO_CONSUMER_KEY,
  consumer_secret: config.DEMO_CONSUMER_SECRET,
  access_token: config.DEMO_ACCESS_TOKEN,
  access_token_secret: config.DEMO_ACCESS_TOKEN_SECRET,
});

getCoin360Image = function () {
  var promise = new Promise(function (resolve, reject) {
    const vgmUrl =
      'https://coin360.com/api/share?width=1920&height=1080&path=/&search=getScreen%26zoom%3D%7B"x"%3A0%2C"y"%3A0%2C"k"%3A1%7D';
    got(vgmUrl)
      .then((response) => {
        var url = JSON.parse(response.body).url;
        resolve(url);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return promise;
};

exports.getImageAndMakeTweet = function () {
  getCoin360Image().then((url) => {
    url = url.toString();
    urlImage = "https://coin360.com/shareimg/" + url;
    download(urlImage, "coin365.png", function () {
      var b64content = fs.readFileSync("./coin365.png", { encoding: "base64" });
      getDate().then((date) => {
        T.post(
          "media/upload",
          { media_data: b64content },
          function (err, data, response) {
            // now we can assign alt text to the media, for use by screen readers and
            // other text-based presentations and interpreters
            var mediaIdStr = data.media_id_string;
            var meta_params = { media_id: mediaIdStr };

            T.post(
              "media/metadata/create",
              meta_params,
              function (err, data, response) {
                if (!err) {
                  // now we can reference the media and post a tweet (media will attach to the tweet)
                  var params = {
                    status:
                      "#Bitcoin Mapa das Criptomoedas representado por market cap com preços representados em USD (" +
                      date +
                      "). \n \n $BTC $ETH $BNB $DOT $ADA",
                    media_ids: [mediaIdStr],
                  };
                  twitterAPI.postTweet(params).then(() => {
                    fs.unlink("./coin365.png", (err) => {
                      if (err) {
                        console.error(err);
                        return;
                      }
                    });
                  });
                }
              }
            );
          }
        );
      });
    });
  });
};

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

getDate = function () {
  var promise = new Promise(function (resolve, reject) {
    dateFormat.i18n = {
      dayNames: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sabado",
      ],
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
    };
    var now = new Date();
    var dateNow = dateFormat(now, "d, mmmm, yyyy")
      .replace(", ", " de ")
      .replace(", ", " de ");

    resolve(dateNow);
  });
  return promise;
};

client.login(config.DISCORD_API_KEY);
