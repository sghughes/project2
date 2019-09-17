var db = require('../models');

module.exports = function(app) {
    // GET routes
    app.get('/api/listings/types', function(req, res) {
        db.ItemType.findAll().then(function(data) {
            res.json(data);
        });
    });

    app.get('/api/listings', function(req, res) {
        db.Listing.findAll().then(function(data) {
            res.json(data);
        });
    });

    app.get("/api/listings/:id", function(req, res) {
        db.Listing.findOne({
          where: {
            id: req.params.id
          }
        })
          .then(function(data) {
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

        db.Listing.create({
            title: data.title,
            description: data.description,
            image: data.image,
            item: data.item,
            condition: data.condition,
            properties: data.properties,
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
    .then(function(dbPost){
        res.json(dbPost);
    })});

    // Delete an example by id
    app.delete('/api/listings/:id', function(req, res) {
        db.Listing.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
            res.json(dbPost);
        });
    });
};
