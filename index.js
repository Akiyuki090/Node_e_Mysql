const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");

const port = 3000;

dotenv.config();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;

  const sql = `INSERT INTO books (title, pagesqty) VALUE ('${title}', '${pagesqty}')`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: `${process.env.user}`,
  password: `${process.env.password}`,
  database: "nodemysql2",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Conectou ao banco");
  app.listen(port, () => {
    console.log(`Esta rodando na porta: ${port}`);
  });
});
