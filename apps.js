const express = require("express");
const morgan = require("morgan");
const googleApps = require("./googleApps-data.js");
const app = express();

app.use(morgan("common"));



app.get('/apps', (req, res) => {

  let {sort, genres} = req.query;

  let apps = [...googleApps];

  if (genres) {
    const validGenres = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
    if (!validGenres.includes(genres.toLowerCase())) {
      return res
        .status(400)
        .send('Genre must be one of the following: "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"');
    }
    apps = apps.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));
  }
  if (sort) {
      if (!(sort.toLowerCase() === "rating") && !(sort.toLowerCase() === "app")){
        return res
        .status(400)
        .send('Must sort by "app" or "rating"');
      }
      if (sort.toLowerCase() === 'rating'){
        apps = apps.sort((a, b) => {
              return b.Rating - a.Rating;
        });
      }
      if (sort.toLowerCase() === 'app'){
          apps = apps.sort((a, b) => {
            if (b.App.toLowerCase() > a.App.toLowerCase())
              return -1;
            else 
              return 1;
          });
      }
  }

  


  return res.json(apps);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
