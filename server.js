var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "poopoo12",
    database: "burgersDB"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers WHERE devoured=false;", function (err, nondevoured) {
        if (err) throw err;
        connection.query("SELECT * FROM burgers WHERE devoured=true;", function (err, devoured) {
            if (err) throw err;
            res.render("index", { nondevouredBurgers: nondevoured, devouredBurgers: devoured });
        });
    });
});

app.post("/", function(req, res) {
    // Test it
    console.log('You sent, ' + req.body.burger);
  
    res.redirect("/");
  });

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
