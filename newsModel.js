class NewsModel {
  constructor() {
    this.headlines = []
    this.url = []
    this.search = null
  }

  getHeadlines() {
    return this.headlines;
  };

  addHeadlines(headline) {
    this.headlines.push(headline)
  };

  addUrl(url) {
    this.url.push(url)
  };

  clear() {
    this.headlines = []
  };
};

module.exports = NewsModel