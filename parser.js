'use strict';

import fs from "fs"
import fm from "front-matter"
import marked from "marked"

var reader = () => {
  return new Promise((resolve, reject) => {
    fs.readdir("./articles", (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}


reader()
  .then((articles) => {

    return Promise.all(articles)

      .then((articles) => {

        return articles.map((article) => {
          var data = fs.readFileSync(`./articles/${article}`, "utf8")

          var rawData = fm(data);
          var meta = rawData.attributes;
          var title = meta.title;
          var description = meta.description;
          // var body = marked(rawData.body);

          var body = rawData.body;

          var set = { title, description, body }
          return set
        })
      })

      .then((set) => {
        fs.writeFileSync("./src/database/articles.json", JSON.stringify(set), "utf8")
      })
  })
