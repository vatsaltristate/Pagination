const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
const PORT = 3620;


var corsOptions = {
  origin: "http://localhost:3620"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("sync database");
  })
  .catch((err) => {
    console.log("Fail to sync database " + err.message);
  });


app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRUD operation" });
});

require("./router/tute.router.js")(app);


app.listen (PORT, (err) => { 
    console.log(`Port is ready to start http://localhost:${PORT}`)
    if (err) {
        console.log(err);
        return;
    }
});