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

  app.get("/formConfirmation", function(req, res) {
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


  app.get("/listings", function(req, res) {
    db.ItemType.findAll({}).then(function(ogs_db) {
      res.render("listings", {
        msg: "Welcome!",
        examples: ogs_db
      });
    });
  });

  app.get("/listings/:id", function(req, res) {
    db.Listing.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("details", {
        listing: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
