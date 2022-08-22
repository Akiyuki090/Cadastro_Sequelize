const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const router = require("./routes/routes");

const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(router);

conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
