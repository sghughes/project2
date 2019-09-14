const types = require('./itemTypes');

module.exports = db => {
    if (!db.ItemType) {
        throw new Error('ItemType model not found.');
    }

    return new Promise((resolve, reject) => {
        types.forEach((value, key) => {
            db.ItemType.findOrCreate({
                where: {
                    name: key
                },
                defaults: {
                    name: value.name,
                    properties: [...value.properties]
                }
            })
                .spread((type, created) => {
                    if (created === true) {
                        console.log(`ItemType ${type} created.`);
                    }
                })
                .catch(() => {
                    reject('ERROR verifying item type base data.');
                });
        });

        resolve('Init successful.');
    });
};
