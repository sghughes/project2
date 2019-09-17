var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.ItemType.findAll({}).then(function(ogs_db) {
      res.render("index", {
        msg: "Welcome!",
        examples: ogs_db
      });
    });
  });

  app.get("/form", function(req, res) {
    db.ItemType.findAll({}).then(function(ogs_db) {
      res.render("form", {
        msg: "Welcome!",
        examples: ogs_db
      });
    });
  });

  app.get("/manage", function(req, res) {
    db.ItemType.findAll({}).then(function(ogs_db) {
      res.render("manage", {
        msg: "Welcome!",
        examples: ogs_db
      });
    });
  });

  
  app.get("/items", function(req, res) {
    db.ItemType.findAll({}).then(function(ogs_db) {
      res.render("items", {
        msg: "Welcome!",
        examples: ogs_db
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(ogs_db) {
      res.render("example", {
        example: ogs_db
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
