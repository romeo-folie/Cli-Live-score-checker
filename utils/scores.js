const axios = require('axios');
const { apiKey } = require('../config/config');
const { apiSecret } = require('../config/config');

var url = `http://livescore-api.com/api-client/fixtures/leagues.json?key=${apiKey}&secret=${apiSecret}`;

var getScores = async (resp, index) => {
  // var response = await axios.get(url)
  var scoreData = await axios.get(resp.data.data.leagues[index].scores + `&secret=${apiSecret}`)
    scoreData.data.data.match.forEach((game) => {
      var score = `${game.home_name} vs ${game.away_name}\n${game.score}\n`
  })
  return score;
}

module.exports = {
  getScores
}
