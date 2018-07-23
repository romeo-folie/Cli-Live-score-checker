const axios = require('axios');
const { apiKey, apiSecret } = require('../config/config');


var url = `http://livescore-api.com/api-client/fixtures/leagues.json?key=${apiKey}&secret=${apiSecret}`;

var getScores = async (league, country) => {
    try{
      var response = await axios.get(url)
      for (var i = 0; i < response.data.data.leagues.length; i++) {
        if (response.data.data.leagues[i].league_name === league && response.data.data.leagues[i].country_name === country)
        {
          var index = i;
        }
      }
      var secondResponse = await axios.get(response.data.data.leagues[index].scores + `&secret=${apiSecret}`)
      var scoreData = secondResponse.data.data.match.map((game) => {
        return `${game.home_name} vs ${game.away_name}\n${game.score}\nTime: ${game.time}\n`
      })
      return scoreData
    }catch(e){
      console.log(e.message)
    }
}

module.exports = {
  getScores
}
