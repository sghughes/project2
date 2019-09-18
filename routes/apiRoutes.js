const db = require('../models');
const Op = require('sequelize').Op;
const crypto = require('crypto');

function getSearchCriteria(params) {
    // Init with search term and active
    const searchCriteria = {
        title: {
            [Op.or]: {
                [Op.eq]: params.item,
                [Op.substring]: params.item
            }
        },
        active: true,
        properties: {}
    };

    // Check remaining filter values and include as needed
    const quality = parseInt(params.itemQuality);
    if (quality !== 0) {
        searchCriteria.itemQuality = quality;
    }
    if (params.gender !== 'all') {
        searchCriteria.properties.gender = params.gender;
    }
    if (params.type !== 'all') {
        searchCriteria.properties.type = params.type;
    }
    if (params.size !== 'all') {
        searchCriteria.properties.size = params.size;
    }
    if (params.color !== 'all') {
        searchCriteria.properties.color = params.color;
    }
    // Only include min/max price if not free
    const min = parseFloat(params.minPrice);
    const max = parseFloat(params.maxPrice);
    const free = params.freeOnly === true || params.freeOnly === 'true';
    if (free) {
        searchCriteria.isFree = true;
    } else if (max > 0.0) {
        searchCriteria.price = {
            [Op.gte]: min,
            [Op.lte]: max
        };
    }

    return searchCriteria;
}

// Generates a random 8 character string
function getRandomString() {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
}

module.exports = function(app) {
    // GET routes
    app.get('/api/listings/types', function(req, res) {
        db.ItemType.findAll().then(function(data) {
            res.json(data);
        });
    });

    app.get('/api/listings', function(req, res) {
        const searchCriteria = getSearchCriteria(req.query);

        db.Listing.findAll({
            where: searchCriteria
        }).then(function(data) {
            res.json(data);
        });
    });

    app.get('/api/listings/:id', function(req, res) {
        db.Listing.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        });
    });

    // POST routes
    app.post('/api/listings', function(req, res) {
        console.log(req.body);
        if (!req.body) {
            res.status(500).send('Listing data missing.');
            return;
        }

        const data = req.body;

        const itemProps = JSON.parse(data.properties);

        db.Listing.create({
            title: data.title,
            description: data.description,
            image: data.image,
            item: data.item,
            itemQuality: data.item_quality,
            properties: itemProps,
            price: data.price,
            isFree: data.isFree || parseFloat(data.price) == 0,
            contactZip: data.contactZip,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            ItemTypeName: 'clothing'
        })
            //         .then(listing => {
            //             res.status(200).json({
            //                 message: `Listing created for ${listing.item}`,
            //                 data: listing
            //             });
            //         })
            //         .catch(err => res.status(500).json(err));
            // });
            .then(function(dbPost) {
                res.json(dbPost);
            });
    });

    // Delete an example by id
    app.delete('/api/listings/:id', function(req, res) {
        db.Listing.destroy({ where: { id: req.params.id } }).then(function(
            dbPost
        ) {
            res.json(dbPost);
        });
    });
};
