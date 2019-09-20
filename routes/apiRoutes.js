const db = require('../models');
const helper = require('../business/helpers')

module.exports = function(app) {
    // GET routes
    app.get('/api/listings/types', function(req, res) {
        db.ItemType.findAll().then(function(data) {
            res.json(data);
        });
    });

    app.get('/api/listings', function(req, res) {
        const searchCriteria = helper.getSearchCriteria(req.query);

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

        var newSellerId = helper.getRandomString();

        const data = req.body;

        const itemProps = JSON.parse(data.properties);

        db.Listing.create({
            title: data.title,
            description: data.description,
            image: data.image,
            item: data.item,
            itemQuality: data.itemQuality,
            properties: itemProps,
            price: data.price,
            isFree: data.isFree || parseFloat(data.price) == 0,
            contactZip: data.contactZip,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            ItemTypeName: 'clothing',
            sellerId: newSellerId
        })
            .then(function(dbPost) {
                //res.render('formConfirmation', { id: dbPost.sellerId })
                res.status(200).send(dbPost.sellerId)
            });
    });

    // Delete an example by id
    app.delete('/api/listings/:sellerId', function(req, res) {
        db.Listing.destroy({ where: { sellerId: req.params.sellerId } }).then(function(
            dbPost
        ) {
            res.json(dbPost);
        });
    });
};
