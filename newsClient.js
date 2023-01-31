const apiKey = require('./apiKey');

class NewsClient {

  loadHeadlines(callback) {
    fetch(`https://content.guardianapis.com/search?api-key={apiKey}`)
    .then((response) => response.json())
    .then((data) => callback(data))
  }
};

module.exports = NewsClient