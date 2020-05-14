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

app.use(express.static('public'));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const localConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "poopoo12",
    database: "burgersDB"
};

const productionConfig = {
    host: "qn66usrj1lwdk1cc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "ff5oqt0hkpm9iht1",
    password: "v19n0ro1gdw7oi4s",
    database: "flyiaoifgjlv7ufc"
};

let dbConfig = localConfig;
if(process.env.NODE_ENV === "production"){
    dbConfig = productionConfig;
}

//Heroku connection
const connection = mysql.createConnection(dbConfig);

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

app.post("/", function (req, res) {
    connection.query(
        "INSERT INTO burgers SET ?",
        {
            burgerName: req.body.burger,
            devoured: false
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        }
    );
    res.redirect("/");
});

app.get("/api/:id", function (req, res) {
    connection.query(
        "UPDATE burgers SET ? WHERE ?",
        [
            {
                devoured: true
            },
            {
                id: req.params.id
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n"); //optional
        }
    );
});

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});

