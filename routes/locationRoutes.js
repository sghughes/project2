var db = require('../models');
const helper = require('../business/helpers');
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
                res.status(200).json(data);
                return;
            } else {
                // Make a request to google maps api to validate and retrieve location data
                // for user-provided zipcode.
                mapsClient
                    .geocode({
                        components: { postal_code: zipcode }
                    })
                    .asPromise()
                    .then(response => {
                        if (response.status !== 200) {
                            res.status(response.status);
                            return;
                        } else if (response.json.results.length === 0) {
                            res.status(404).send(
                                `Invalid zip code ${zipcode}`
                            );
                            return;
                        }

                        // We found geocode data, now add to DB for future use, then return as json.
                        const geocodeData = response.json.results[0];

                        // Get formatted location name
                        const matches = geocodeData.formatted_address.match(
                            /\b\w+,\s\w{2}/
                        );
                        const locationName =
                            matches && matches.length > 0 ? matches[0] : '';

                        const newLocation = {
                            zipcode: zipcode,
                            latitude: geocodeData.geometry.location.lat,
                            longitude: geocodeData.geometry.location.lng,
                            name: locationName
                        };

                        db.Location.create(newLocation).then(() =>
                            res.json(newLocation)
                        );
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send(
                            'Error processing location lookup.'
                        );
                    });
            }
        });
    });

    app.get('/api/locations/:lat/:lng', (req, res) => {
        const lat = req.params.lat;
        const lng = req.params.lng;
        if (!lat || !lng) {
            res.status(400).send('Missing longitude and latitude information.');
            return;
        }

        // First check DB to see if we have a stored location
        db.Location.findOne({
            where: {
                [db.Op.and]: {
                    latitude: lat,
                    longitude: lng
                }
            }
        }).then(data => {
            // If we have a stored location with a name, then just return
            if (data && data.name) {
                res.json(data);
                return;
            }

            // If not, then use google maps API to look up location info
            mapsClient
                .reverseGeocode({
                    latlng: [lat, lng]
                })
                .asPromise()
                .then(response => {
                    if (response.status !== 200) {
                        res.status(response.status);
                        return;
                    } else if (response.json.results.length === 0) {
                        res.status(404).send(
                            `Reverse geocode lookup failed for (lat,lng) ${lat},${lng}`
                        );
                        return;
                    }

                    // We found geocode data, now add to DB for future use, then return as json.
                    const addressData =
                        response.json.results[0].address_components;
                    const zipData = addressData.find(
                        a => a.types && a.types[0] === 'postal_code'
                    );
                    const cityData = addressData.find(
                        a => a.types && a.types[0] === 'locality'
                    );
                    const stateData = addressData.find(
                        a =>
                            a.types &&
                            a.types[0] === 'administrative_area_level_1'
                    );

                    // If we have all required information, then find or create associated Location record
                    if (zipData && cityData && stateData) {
                        const location = {
                            zipcode: parseInt(zipData.short_name),
                            latitude: lat,
                            longitude: lng,
                            name: `${cityData.short_name}, ${stateData.long_name}`
                        };

                        db.Location.findOne({
                            where: {
                                zipcode: location.zipcode
                            }
                        }).then(data => {
                            if (data) {
                                data.update(location);
                            } else {
                                db.Location.create(location);
                            }

                            res.json(location);
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(
                        'Error processing google maps reverse geocode request.'
                    );
                });
        });
    });

    // Currently looks up distance between two zip codes
    app.get('/api/distance', (req, res) => {
        const zipSrc = req.query.zipSrc;
        const zipDest = req.query.zipDest;

        if (!zipSrc || !zipDest) {
            res.status(400).send('Required zip code params missing.');
            return;
        }

        helper
            .getDistanceBetween(zipSrc, zipDest)
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    });

    app.post('/api/distance/filtered', (req, res) => {
        const listings = req.body;
        if (!listings) {
            res.code(400).send('Missing listing data.');
            return;
        }

        const currentZip = parseInt(req.query.zipSrc);
        const maxDist = parseInt(req.query.maxDist);

        helper
            .filterByDistance(listings, currentZip, maxDist)
            .then(filtered => res.json(filtered))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    });
};
