const axios = require('axios');
const { apiKey } = require('../config/config');
const { apiSecret } = require('../config/config');

var url = `http://livescore-api.com/api-client/fixtures/leagues.json?key=${apiKey}&secret=${apiSecret}`;

var getFixtures = async () => {
  // var response = await axios.get(url)
  var fixtureData = await axios.get(response.data.data.leagues[index].fixures + `&secret=${apiSecret}`)
  fixtureData.data.data.fixtures.forEach((game) => {
    console.log(`Fixture: ${game.home_name} vs ${game.away_name}\nDate: ${game.date}\nTime: ${game.time}\n`)
  })
}

module.exports = {
  getFixtures
}
