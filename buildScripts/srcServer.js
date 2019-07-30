import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";

/* eslint-disable no-console */
const port = 3000;
const app = express();
const compiler = webpack(config);

//configure webpack with express
app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

//set up express
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.get("/users", function(req, res) {
  res.json([
    {
      id: 1,
      firstname: "Smith",
      lastname: "John",
      email: "johnsmith@examp.com"
    },
    {
      id: 2,
      firstname: "Sink",
      lastname: "Opuba",
      email: "sinkopuba@examp.com"
    },
    { id: 3, firstname: "Fiyin", lastname: "Sone", email: "fsoneye@examp.com" }
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
