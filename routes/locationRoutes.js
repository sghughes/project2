var db = require('../models');

module.exports = function(app) {
    // Look up all stored locations
    app.get('/api/locations', (req, res) => {
        db.Location.findAll().then(data => {
            res.json(data);
        });
    })

    // Look up one location
    app.get('/api/locations/:zipcode', (req, res) => {
        // Check DB for location info for requested zip
        const zipcode = req.params.zipcode;
        db.Location.findOne({
            where: {
                zipcode: zipcode
            }
        }).then(data => {
            // Return location data if found
            if (data) {
                res.json(data);
            } else {
                // TODO - this needs to call google maps api if not found, then add to Location table,
                // then return new Location.
                res.status(404).send(`No location found for zip ${zipcode}`);
            }
        });
    });
};
