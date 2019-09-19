const crypto = require('crypto');
const moment = require('moment');
const Op = require('sequelize').Op;

const QUALITY = ['','New','Great','Used','Worn','Damaged'];

module.exports = {
    // Generates a random 8 character string
    getRandomString: function() {
        return crypto
            .randomBytes(4)
            .toString('hex')
            .toUpperCase();
    },
    getSearchCriteria: function(params) {
        let searchCriteria = {
            active: true,
            properties: {}
        };

        if (params.item) {
            searchCriteria.title = {
                [Op.or]: {
                    [Op.eq]: params.item,
                    [Op.substring]: params.item
                }
            };
        }

        // Check remaining filter values and include as needed
        const quality = parseInt(params.itemQuality);
        if (!Number.isNaN(quality) && quality !== 0) {
            searchCriteria.itemQuality = quality;
        }
        if (params.gender && params.gender !== 'all') {
            searchCriteria.properties.gender = params.gender;
        }
        if (params.type && params.type !== 'all') {
            searchCriteria.properties.type = params.type;
        }
        if (params.size && params.size !== 'all') {
            searchCriteria.properties.size = params.size;
        }
        if (params.color && params.color !== 'all') {
            searchCriteria.properties.color = params.color;
        }
        // Only include min/max price if not free
        const min = parseFloat(params.minPrice);
        const max = parseFloat(params.maxPrice);
        const free = params.freeOnly === true || params.freeOnly === 'true';
        if (free) {
            searchCriteria.isFree = true;
        } else if (!Number.isNaN(min) && !Number.isNaN(max) && max > 0.0) {
            searchCriteria.price = {
                [Op.gte]: min,
                [Op.lte]: max
            };
        }

        return searchCriteria;
    },
    formatListingObjects: function(listings) {

        return listings.map(listing => {

            let title = listing.title;
            if (listing.properties.size) {
                title += ` (${listing.properties.size.toUpperCase()})`;
            }

            let priceCond = `$${listing.price.toFixed(2)}`;
            if (QUALITY[listing.itemQuality]) {
                priceCond += ` - ${QUALITY[listing.itemQuality]}`;
            }

            return {
                id: listing.id,
                title: title,
                image: listing.image,
                description: listing.description,
                isFree: listing.isFree,
                price: priceCond,
                created: `Listed ${moment(listing.createdAt).fromNow()}`
            };
        });
    },
    getResultsTemplate: function() {
        return `{{#each results}}
                    <a href="/listings/{{ id }}" class="listing-card">
                        <div class="card">
                            <h5 class="card-header text-capitalize">{{ title }}</h5>
                            <img src="{{ image }}" alt="listing image" class="card-img-top">
                            <div class="card-body">

                                {{#if isFree}}
                                <h5 class="card-title"><strong>FREE!</strong></h5>
                                {{else}}
                                    <h5 class="card-title">{{ price }}</h5>
                                {{/if}}

                                <p class="card-text">{{ description }}</p>
                                <p class="card-text listing-time"><small class="text-muted">{{ created }}</small></p>

                            </div>
                        </div>
                    </a>
                {{/each}}`;
    }
};
