var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("index")
  });

  app.get("/form", function(req, res) {
    res.render("form");
  });

  app.get("/manage", function(req, res) {
    res.render("manage");
  });


  app.get("/listings", function(req, res) {
    res.render("listings");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
