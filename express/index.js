const express = require("express");

const app = express();

app.set("view engine", "ejs");

app
  .route("/about")
  .get((req, res) => {
    res.render("pages/about");
  })
  .post((req, res) => {
    res.send("POST");
  })
  .put((req, res) => {
    res.send("PUT");
  });

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
