const crypto = require('crypto');
const Op = require('sequelize').Op;

module.exports = {
    // Generates a random 8 character string
    getRandomString: function() {
        return crypto.randomBytes(4).toString('hex').toUpperCase();
    },
    getSearchCriteria: function(params) {
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
};