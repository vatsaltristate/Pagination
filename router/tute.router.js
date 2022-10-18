module.exports = app => {
    const tutorials = require("../controller/tute.controller.js");
  
    var router = require("express").Router();
  
    router.post("/c", tutorials.create);
    router.get("/r", tutorials.findAll);
    router.get("/rp", tutorials.findAllPublished);

  
    app.use("/tute", router);
  };