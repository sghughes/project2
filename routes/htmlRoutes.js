var db = require('../models');
var helper = require('../business/helpers');
var handlebars = require('handlebars');

const resultsPartial = helper.getResultsTemplate();
const mapPartial = helper.getMapFrameTemplate();
handlebars.registerPartial('searchResults', resultsPartial);
handlebars.registerPartial('mapFrame', mapPartial);

module.exports = function(app) {
    // Load index page
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/sell', function(req, res) {
        res.render('sell');
    });

    app.get('/formConfirmation', function(req, res) {
        res.render('formConfirmation');
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
                data: {
                    results: []
                },
                layout: 'main'
            });
        });
    });

    app.get('/listings/search', function(req, res) {
        const searchCriteria = helper.getSearchCriteria(req.query);

        db.Listing.findAll({
            where: searchCriteria
        }).then(listings => {
            const currentZip = parseInt(req.query.zipSrc);
            const maxDist = parseInt(req.query.distance);

            helper
                .filterByDistance(listings, currentZip, maxDist)
                .then(listings => {

                    let context = {};

                    if (listings && listings.length > 0) {
                        const filtered = listings.filter(
                            l =>
                                typeof l.include === 'undefined' ||
                                l.include === true
                        );
                        context = helper.formatListingObjects(filtered);
                    }

                    const partial = handlebars.compile(resultsPartial);
                    const html = partial({
                        data: {
                            results: context,
                            zip: currentZip
                        },
                        layout: 'results'
                    });

                    res.set('Content-Type', 'text/html');
                    res.status(200).send(html);
                })
                .catch(err => {
                    console.log('Error filtering search results...', err);
                    res.status(500).send('Error retrieving search results.');
                });
        });
    });

    app.get('/listings/:id', function(req, res) {
        const location = parseInt(req.query.location);

        db.Listing.findOne({ where: { id: req.params.id } }).then(data => {
            const mapUrl = helper.buildMapSource(location, data.contactZip);

            const renderListing = (res, data, location, dist) => {
                res.render('details', {
                    listing: data,
                    directions: mapUrl.indexOf('directions') > 1,
                    mapSource: mapUrl,
                    zipSrc: location,
                    zipDest: data.contactZip,
                    priceUSD: `$${data.price.toFixed(2)}`,
                    condition: helper.getItemCondition(data.itemQuality),
                    distance: dist ? dist.milesValue.toFixed(1) : ''
                });
            };

            if (location && data.contactZip) {
                helper
                    .getDistanceBetween(location, data.contactZip)
                    .then(distData =>
                        renderListing(res, data, location, distData)
                    )
                    .catch(err => {
                        console.log(
                            'Could not look up distance information.',
                            err
                        );
                    });
            } else {
                renderListing(res, data, location);
            }
            return;
        });

        // Render 404 page for any unmatched routes
        app.get('*', function(req, res) {
            res.render('404');
        });
    });
};
