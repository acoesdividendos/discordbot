# Discord Bot

A discord bot that execute based on commands of messages on discord and that fetchs tweets from one account.

## Getting Started

With this instructions you will be able to run the application and get a discord bot to execute the commands.

## Installing

First you will just need to clone the repository.

```
git clone https://github.com/acoesdividendos/discordbot
```

And then go into the folder of the repository.

```
cd discord_bot
```

And run the instalation of the packages needed to run the bot.

```
npm install
```

You will need to create a config.json with the configurations for the discord bot API, twitter API and mongoDB.

```
{
    "DISCORD_API_KEY" : "",
    "TWITTER_API_KEY" : "",
    "CONSUMER_KEY":"",
    "CONSUMER_SECRET":"",
    "ACCESS_TOKEN":"",
    "ACCESS_TOKEN_SECRET":"",
    "DEMO_TWITTER_API_KEY": "",
    "DEMO_CONSUMER_KEY":"",
    "DEMO_CONSUMER_SECRET":"",
    "DEMO_ACCESS_TOKEN":"",
    "DEMO_ACCESS_TOKEN_SECRET":"",
    "database": ""
}
```

## Running the application

To run the bot you just need to run:

```
node main.js .
```

## Example of execution

When starting the bot the application we will get the message.
```
Bot is online!
```

By default the bot will fetch news from one API and then post them to the discord:
![](https://cdn.discordapp.com/attachments/818899401011363891/830587309996113980/unknown.png)

Then if we react to the message on discord with the news, the news will get posted on Twitter.
![](https://cdn.discordapp.com/attachments/818899401011363891/830587664096296960/unknown.png)
![](https://cdn.discordapp.com/attachments/818899401011363891/830587861425848390/unknown.png)


## Built With

- [MongoDB](https://www.mongodb.com) - The database used
- [Npm](https://www.npmjs.com) - Used to install the packages used in the application
- [Twitter API](https://developer.twitter.com/en) - Used to post to Twitter
- [FMP API](https://financialmodelingprep.com) - Used to get the news

## Authors

- **Afonso Costa** - _Initial development_ - [acoesdividendos](https://github.com/acoesdividendos/)
