var db = require('../models');
var helper = require('../business/helpers');
var handlebars = require('handlebars');

const resultsPartial = helper.getResultsTemplate();
handlebars.registerPartial('searchResults', resultsPartial);

module.exports = function(app) {
    // Load index page
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/form', function(req, res) {
        res.render('form');
    });

  app.get("/formConfirmation", function(req, res) {
    res.render("formConfirmation");
  });

    app.get('/manage', function(req, res) {
        res.render('manage');
    });

    app.get('/listings', function(req, res) {
        const searchCriteria = helper.getSearchCriteria(req.query);

        db.Listing.findAll({
            where: searchCriteria
        }).then(listings => {
          res.render('listings', {
            results: helper.formatListingObjects(listings),
            layout: 'main'
          });
        });
    });

    app.get('/listings/search', function(req, res) {
      const searchCriteria = helper.getSearchCriteria(req.query);

      db.Listing.findAll({
          where: searchCriteria
      }).then(listings => {

        const partial = handlebars.compile(resultsPartial);
        const html = partial({
          results: helper.formatListingObjects(listings),
          layout: 'results'
        });

        res.set('Content-Type', 'text/html');
        res.status(200).send(html);
      });
  });

    app.get('/listings/:id', function(req, res) {
        db.Listing.findOne({ where: { id: req.params.id } }).then(function(
            data
        ) {
            return res.render('details', {
                listing: data
            });
        });

        // Render 404 page for any unmatched routes
        app.get('*', function(req, res) {
            res.render('404');
        });
    });
};
