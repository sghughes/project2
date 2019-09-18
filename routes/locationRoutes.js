var db = require('../models');
const mapsClient = require('@google/maps').createClient({
    key: process.env.GMAPS_KEY,
    Promise: Promise
});

module.exports = function(app) {
    // Look up all stored locations
    app.get('/api/locations', (req, res) => {
        db.Location.findAll().then(data => {
            res.json(data);
        });
    });

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
                mapsClient.geocode({
                    components: { postal_code: zipcode }
                }).asPromise()
                .then(response => {
                    if (response.status !== 200) {
                        res.status(response.status);
                    } else if (response.json.results.length === 0) {
                        res.status(404).send(`Geocode lookup failed for zipcode ${zipcode}`);
                    }

                    // We found geocode data, now add to DB for future use, then return as json.
                    const geocodeData = response.json.results[0];
                    const newLocation = {
                        zipcode: zipcode,
                        latitude: geocodeData.geometry.location.lat,
                        longitude: geocodeData.geometry.location.lng,
                    };

                    db.Location.create(newLocation).then(() => res.json(newLocation));
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send('Error processing google maps geocode request.');
                });
            }
        });
    });
};
