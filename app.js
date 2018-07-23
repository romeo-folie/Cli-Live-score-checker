#!/usr/bin/env node
const axios = require('axios')
const yargs = require('yargs')
const ora = require('ora')

const { apiKey } = require('./config/config');
const { apiSecret } = require('./config/config');


var url = `http://livescore-api.com/api-client/fixtures/leagues.json?key=${apiKey}&secret=${apiSecret}`;

const argv = yargs.argv
const spinner = ora().start()

if(argv._.length < 1){
  spinner.stop()
  console.log("Please enter a command between scores and fixtures");
  process.exit(1);
}

axios.get(url).then((response) => {
  for (var i = 0; i < response.data.data.leagues.length; i++) {
    if (response.data.data.leagues[i].league_name === argv.league && response.data.data.leagues[i].country_name === argv.country){
      var index = i;
    }
  }
  if(argv._[0] === 'scores'){
    return axios.get(response.data.data.leagues[index].scores + `&secret=${apiSecret}`)
  }
  else if(argv._[0] === 'fixtures'){
    return axios.get(response.data.data.leagues[index].fixures + `&secret=${apiSecret}`)
  }
})
.then((secondResponse) => {
  if(argv._[0] === 'scores'){
    secondResponse.data.data.match.forEach((game) => {
      spinner.stop()
      console.log(`${game.home_name} vs ${game.away_name}\n${game.score}`)
    });
  }
  else if(argv._[0] === 'fixtures'){
    secondResponse.data.data.fixtures.forEach((game) => {
      spinner.stop()
      console.log(`${game.home_name} vs ${game.away_name}`)
    });
  }
})
.catch((e) => {
  spinner.stop()
  console.log(e.message)
})
