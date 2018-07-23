#!/usr/bin/env node

//Run livescore-cli [scores][fixtures] --league --country on the command line || livescore-cli --help for more information
//Livescore gave me 15 day access to their api so I decided to use it to play with it a little
const axios = require('axios')
const yargs = require('yargs')
const ora = require('ora')

const { apiKey,apiSecret } = require('./config/config');

var url = `http://livescore-api.com/api-client/fixtures/leagues.json?key=${apiKey}&secret=${apiSecret}`;

//Options for cli arguments
var leagueOptions = {
  describe: "Name of league to fetch from",
  demand: true,
  alias: 'l'
};

var countryOptions = {
  describe: "Name of country to fetch league from",
  demand: true,
  alias: 'c'
};

//Command and help setup
const argv = yargs.command('scores','Displays scores of ongoing games',{
  league: leagueOptions,
  country: countryOptions
})
.command('fixtures', 'Displays upcoming fixtures in the specified league',{
  league: leagueOptions,
  country: countryOptions
})
.help().argv;

var command = argv._[0]
const spinner = ora().start()

if(argv._.length == 0){
  spinner.stop()
  console.log("Add --help for more information")
  process.exit(1);
}

if(command === 'scores'){
  var { getScores } = require('./utils/scores');
  getScores(argv.league, argv.country)
  .then((game) => {
    spinner.stop()
    for (var i = 0; i < game.length; i++) {
      console.log(game[i])
    }
  })
  .catch((e) => {
    spinner.stop()
    console.log(e.message)
  })
}
else if(command === 'fixtures'){
  const { getFixtures } = require('./utils/fixtures');
  getFixtures(argv.league, argv.country)
  .then((fixture) => {
    spinner.stop()
    for (var i = 0; i < fixture.length; i++) {
      console.log(fixture[i])
    }
  })
  .catch((e) => {
    spinner.stop()
    console.log(e.message)
  })
}
