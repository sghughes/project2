const db = require('../models');
const crypto = require('crypto');
const moment = require('moment');
const Op = require('sequelize').Op;
const mapsClient = require('@google/maps').createClient({
    key: process.env.GMAPS_KEY,
    Promise: Promise
});

const QUALITY = ['', 'New', 'Great', 'Used', 'Worn', 'Damaged'];

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
        const free =
            params.freeOnly === true ||
            params.freeOnly === 'true' ||
            params.freeOnly === 'on';
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

            const descPreview =
                listing.description.length > 80
                    ? listing.description.substring(0, 77) + '...'
                    : listing.description;

            return {
                id: listing.id,
                title: title,
                image: listing.image,
                description: descPreview,
                isFree: listing.isFree,
                price: priceCond,
                created: `Listed ${moment(listing.createdAt).fromNow()}`,
                miles: listing.miles,
                quality: QUALITY[listing.itemQuality],
                priceUSD: `${listing.price.toFixed(2)}`
            };
        });
    },
    getItemCondition(condition) {
        const value = parseInt(condition);
        if (value && Number.isInteger(value)) {
            return QUALITY[value];
        }
        return 'Unknown';
    },
    getResultsTemplate: function() {
        return `{{#each data.results}}
                    <a href="/listings/{{ id }}?location={{ ../data.zip }}" class="listing-card rounded">
                        <div class="card result">
                            <h5 class="card-header text-capitalize">{{ title }}</h5>
                            <img src="{{ image }}" onerror="this.src='/images/default.jpg';" alt="listing image" class="card-img-top">
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
    },
    getMapFrameTemplate: function() {
        return `<div class="card">
                    <div class="card-header font-weight-bold">
                        {{#if directions}}
                            Directions
                        {{else}}
                            Location
                        {{/if}}
                    </div>
                    <div class="card-body p-0">
                        <iframe width="100%" height="450" frameborder="0" style="border:0"
                        src="{{ mapSource }}"></iframe>
                    </div>
                </div>`;
    },
    getDistanceBetween(zipSrc, zipDest) {
        return new Promise((resolve, reject) => {
            if (!zipSrc || !zipDest) {
                reject('Required zip code params missing.');
                return;
            }

            // Save us some work if source and dest are the same...
            if (zipSrc === zipDest) {
                resolve({
                    zipSrc: zipSrc,
                    zipDest: zipDest,
                    milesText: '0 mls',
                    milesValue: 0
                });
            }

            // First check Distance table for information
            db.Distance.findOne({
                where: {
                    [db.Op.and]: {
                        zipSrc: zipSrc,
                        zipDest: zipDest
                    }
                }
            })
                .then(data => {
                    if (data) {
                        resolve(data);
                        return;
                    }

                    // Look up distance info from google maps api
                    mapsClient
                        .distanceMatrix({
                            origins: zipSrc,
                            destinations: zipDest,
                            units: 'imperial'
                        })
                        .asPromise()
                        .then(data => {
                            const element = data.json.rows[0].elements[0];
                            if (!element || element.status === 'ZERO_RESULTS') {
                                reject(`ZERO RESULTS (DISTANCE): ${zipSrc},${zipDest}`);
                                return;
                            }

                            const dist = element.distance;
                            const miles = parseFloat(dist.value) / 1609.344;
                            const milesText = dist.text.trim();

                            const distanceInfo = {
                                zipSrc: zipSrc,
                                zipDest: zipDest,
                                milesText: milesText,
                                milesValue: miles
                            };

                            db.Distance.findOrCreate({
                                where: {
                                    [db.Op.and]: {
                                        zipSrc: zipSrc,
                                        zipDest: zipDest
                                    }
                                },
                                defaults: {
                                    zipSrc: zipSrc,
                                    zipDest: zipDest,
                                    milesText: distanceInfo.milesText,
                                    milesValue: distanceInfo.milesValue
                                }
                            }).then(() => {
                                resolve(distanceInfo);
                            }).catch(err => {
                                console.log('DB ERROR: ', err);
                            });
                        })
                        .catch(err => {
                            console.log('MAPS CLIENT ERROR: ', err);
                        });
                })
                .catch(err => {
                    console.log('MAPS CLIENT ERROR: ', err);
                });
        }).catch(err => {
            console.log('DISTANCE ERROR: ', err);
        });
    },
    filterByDistance: function(listings, zip, maxDist) {
        let promises = listings.map(
            listing =>
                new Promise((res, rej) => {
                    this.getDistanceBetween(zip, listing.contactZip).then(
                        distData => {
                            if (!distData||typeof distData.milesValue === 'undefined') {
                                rej({listing, 'okay': false});
                                return;
                            }
                            let inRange = distData.milesValue <= maxDist;
                            listing.include = maxDist === 0 || inRange;
                            listing.miles = distData.milesValue.toFixed(1);
                            res(listing);
                        }
                    );
                })
        );

        return Promise.all(promises).catch(err => {console.log(err)});
    },
    buildMapSource(fromZip, toZip) {
        const apiKey = process.env.GMAPS_KEY;
        let mapsUrl = 'https://www.google.com/maps/embed/v1/';
        let params;
        if (!fromZip || fromZip === '' || fromZip === 0 || fromZip == toZip) {
            params = `place?q=${toZip}`;
        } else {
            params = `directions?origin=${fromZip}&destination=${toZip}`;
        }

        return `${mapsUrl}${params}&key=${apiKey}`;
    }
};
