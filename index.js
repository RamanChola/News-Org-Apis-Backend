const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("6a1d4f2afd3b4379bd04f56e72a8bb6d");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  newsapi.v2
    .topHeadlines({
      sources: "google-news-in,the-hindu,the-times-of-india",
      language: "en",
    })
    .then((response) => {
      res.send(response);
    });
});

app.get("/search/:title", (req, res) => {
  const q = req.params.title;
  newsapi.v2
    .everything({
      q: q,
      sources: "bbc-news,the-verge",
      domains: "bbc.co.uk",
      language: "en",
      sortBy: "relevancy",
    })
    .then((response) => {
      res.send(response);
      /*
          {
            status: "ok",
            articles: [...]
          }
        */
    });
});

app.get("/filter/:category", (req, res) => {
  const category = req.params.category;
  newsapi.v2
    .topHeadlines({
      category: category,
      language: "en",
      country: "in",
    })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
