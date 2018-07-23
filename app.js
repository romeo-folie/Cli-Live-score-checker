#!/usr/bin/env node
const axios = require('axios')
const yargs = require('yargs')
const ora = require('ora')

const { apiKey } = require('./config/config');
const { apiSecret } = require('./config/config');

var url = `http://livescore-api.com/api-client/fixtures/leagues.json?key=${apiKey}&secret=${apiSecret}`;

//Options for cli arguments
const leagueOptions = {
  describe: "Name of league to fetch from",
  demand: true,
  alias: 'l'
};

const countryOptions = {
  describe: "Name of country to fetch league from",
  demand: true,
  alias: 'c'
}

//Command and help setup
const argv = yargs.command('scores','Displays scores of ongoing games',{
  league: leagueOptions,
  country: countryOptions
})
.command('fixtures', 'Displays upcoming fixtures in the specified league',{
  league: leagueOptions,
  country: countryOptions
})
.help().argv

var command = argv._[0]
const spinner = ora().start()

if(argv._.length == 0){
  spinner.stop()
  console.log("Add --help for more information")
  process.exit(1);
}

axios.get(url).then((response) => {
  for (var i = 0; i < response.data.data.leagues.length; i++) {
    if (response.data.data.leagues[i].league_name === argv.league && response.data.data.leagues[i].country_name === argv.country){
      var index = i;
    }
  }
  if(command === 'scores'){
    return axios.get(response.data.data.leagues[index].scores + `&secret=${apiSecret}`)
  }
  else if(command === 'fixtures'){
    return axios.get(response.data.data.leagues[index].fixures + `&secret=${apiSecret}`)
  }
})
.then((secondResponse) => {
  if(command === 'scores'){
    secondResponse.data.data.match.forEach((game) => {
      spinner.stop()
      console.log(`${game.home_name} vs ${game.away_name}\n${game.score}\n`)
    });
  }
  else if(command === 'fixtures'){
    secondResponse.data.data.fixtures.forEach((game) => {
      spinner.stop()
      console.log(`Fixture: ${game.home_name} vs ${game.away_name}\nDate: ${game.date}\nTime: ${game.time}\n`)
    });
  }
})
.catch((e) => {
  spinner.stop()
  console.log(e.message)
})
