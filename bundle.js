(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // newsModel.js
  var require_newsModel = __commonJS({
    "newsModel.js"(exports, module) {
      var NewsModel2 = class {
        constructor() {
          this.headlines = [];
          this.url = [];
          this.search = null;
        }
        getHeadlines() {
          return this.headlines;
        }
        addHeadlines(headline) {
          this.headlines.push(headline);
        }
        addUrl(url) {
          this.url.push(url);
        }
        clear() {
          this.headlines = [];
        }
      };
      module.exports = NewsModel2;
    }
  });

  // newsClient.js
  var require_newsClient = __commonJS({
    "newsClient.js"(exports, module) {
      var NewsClient2 = class {
        loadHeadlines(callback) {
          fetch("https://content.guardianapis.com/search?api-key=fb6641b9-7470-4efe-87ff-d95f13c3c0ff").then((response) => response.json()).then((data) => callback(data));
        }
      };
      module.exports = NewsClient2;
    }
  });

  // apiKey.js
  var require_apiKey = __commonJS({
    "apiKey.js"(exports, module) {
      module.exports = "c0c43386-43d3-4ce0-8ae2-8d1ac262972f";
    }
  });

  // newsView.js
  var require_newsView = __commonJS({
    "newsView.js"(exports, module) {
      var model2 = require_newsModel();
      var client2 = require_newsClient();
      var apiKey = require_apiKey();
      var NewsViews = class {
        constructor(model3, client3) {
          this.model = model3;
          this.client = client3;
          this.displayHeadlinesFromAPI();
          this.buttonSubmit = document.querySelector("#submit");
          this.buttonSubmit.addEventListener("click", () => {
            const searchValue = document.querySelector("#search-value").value;
            this.model.search = searchValue;
            console.log(searchValue);
            this.displayFilterHeadlinesFromAPI();
          });
        }
        displayFilterHeadlinesFromAPI() {
          const all_headlines = this.model.getHeadlines();
          const filter = (element) => {
            if (element.headline.includes(this.model.search)) {
              console.log(element.headline);
            }
          };
          const filtered = all_headlines.forEach(filter);
        }
        displayHeadlinesFromAPI() {
          const headllines = this.client.loadHeadlines((headline) => {
            const response = headline.response.results;
            const webTitle_url = (element) => {
              const news_object = {};
              news_object.headline = element.webTitle;
              news_object.url = element.webUrl;
              this.model.addHeadlines(news_object);
            };
            const names = response.forEach(webTitle_url);
            this.displayHeadlines();
          });
        }
        displayHeadlines() {
          const insert_headline = (object) => {
            const newElement = document.createElement("a");
            const text = document.createTextNode(object.headline);
            newElement.setAttribute("href", object.url);
            newElement.appendChild(text);
            newElement.className = "headlines";
            const lineBreak = document.createElement("br");
            document.querySelector("#main-container").append(newElement);
            document.querySelector("#main-container").append(lineBreak);
          };
          const headlines = this.model.getHeadlines();
          const loop_headline = headlines.forEach(insert_headline);
        }
      };
      module.exports = NewsViews;
    }
  });

  // index.js
  var NewsView = require_newsView();
  var NewsModel = require_newsModel();
  var NewsClient = require_newsClient();
  var model = new NewsModel();
  var client = new NewsClient();
  var view = new NewsView(model, client);
  view.displayFilterHeadlinesFromApi();
})();
