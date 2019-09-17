var db = require('../models');

module.exports = function(app) {
    app.get('/location/:zipcode', (req, res) => {
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
