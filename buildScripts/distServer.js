/*This production build server set up is NOT for actual production
  use. This is just useful for hosting the minified production build
  for local debugging purposes. And to make use the production build
  works locally
*/
import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

/* eslint-disable no-console */
const port = 3000;
const app = express();

//enable gzip compression in express
app.use(compression());

app.use(express.static("dist"));
//set up express
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
