// Global object to store filter values. Set to default values.
const Filters = {
    distance: 10, // 0 = Any distance
    minPrice: 0.0,
    maxPrice: 100.0,
    itemQuality: 0,
    gender: 'all',
    type: 'all',
    size: 'all',
    color: 'all',
    freeOnly: false
};

// Resets Filters to default values
function resetFilters() {
    Filters.distance = 10;
    Filters.minPrice = 0.0;
    Filters.maxPrice = 100.0;
    Filters.itemQuality = 0;
    Filters.gender = 'all';
    Filters.type = 'all';
    Filters.size = 'all';
    Filters.color = 'all';
    Filters.freeOnly = false;
}

// Creates a Listing card
function createListingCard(listing) {

    // Main Listing card div element
    const card = document.createElement('div');
    card.classList.add('card');

    // Listing image element
    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.setAttribute('src', listing.image);
    image.setAttribute('alt', 'listing image');

    // Card body div element
    const body = document.createElement('div');
    body.classList.add('card-body');

    // Card title element
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerText = listing.title;

    // Card text element
    const text = document.createElement('p');
    text.classList.add('card-text');
    text.innerText = listing.description; // TODO - determine text length limit

    // Card Listing link element
    const link = document.createElement('a');
    link.classList.add('btn', 'btn-primary');
    link.innerText = 'Details';
    link.setAttribute('href', `/listings/${listing.id}`);

    // Construct and return final listing card from elements
    body.append(title, text, link);
    card.append(image, body);

    return card;
}

// Updates the displayed search results using the supplied listings
function updateResults(listings) {
    // Get search results container.
    const container = document.querySelector('#search-results');
    if (!container) {
        return;
    }

    // Clear search results container before updating.
    container.innerHTML = '';

    // Return early if no listings found.
    if (!listings || listings.count === 0) {
        return;
    }

    // Create cards for each listing, then append to search results container.
    const listingCards = listings.map(listing => createListingCard(listing));
    listingCards.forEach(card => container.appendChild(card));
}

// Add event listeners and perform necessary initializtion
// once page content is loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Get distance slider and distOutput field
    const distSlider = document.querySelector('#range-distance');
    const distLabel = document.querySelector('#label-distance');

    // Update the current distance value
    distSlider.addEventListener('input', function() {
        const distLbl = this.value == 0 ? 'Any distance' : `Within ${this.value} miles`;
        distLabel.innerHTML = distLbl;
        Filters.distance = this.value;
    });

    // Get min/max price inputs. Disable if 'Free Only' checked.
    const priceInputs = document.querySelector('#input-prices');
    const minPrice = document.querySelector('#min-price');
    const maxPrice = document.querySelector('#max-price');

    // Min price input
    minPrice.addEventListener('input', function() {
        // TODO - add try/catch
        const min = parseFloat(this.value);
        Filters.minPrice = min;
    });

    // Max price input
    maxPrice.addEventListener('input', function() {
        // TODO - add try/catch
        const max = parseFloat(this.value);
        Filters.maxPrice = max;
    });

    // Free only checkbox
    const freeCheckbox = document.querySelector('#is-free');
    freeCheckbox.addEventListener('click', function() {
        // If checked, disable price input
        if (this.checked) {
            priceInputs.classList.add('disabledinput');
        } else {
            priceInputs.classList.remove('disabledinput');
        }
        // Update filter value
        Filters.freeOnly = this.checked;
    });

    // Update gender selection
    const selectedGender = document.querySelector('#select-gender');
    selectedGender.addEventListener('change', function() {
        Filters.gender = this.value.toLowerCase();
    });

    // Update item type
    const selectedType = document.querySelector('#select-type');
    selectedType.addEventListener('change', function() {
        Filters.type = this.value.toLowerCase();
    });

    // Update size selection
    const selectedSize = document.querySelector('#select-size');
    selectedSize.addEventListener('change', function() {
        Filters.size = this.value.toLowerCase();
    });

    // Update color selection
    const selectedColor = document.querySelector('#select-color');
    selectedColor.addEventListener('change', function() {
        Filters.color = this.value.toLowerCase();
    });

    // Update item quality selection
    const selectedCond = document.querySelector('#select-quality');
    selectedCond.addEventListener('change', function() {
        Filters.itemQuality = parseInt(this.value);
    });

    // Filter button click
    const filterBtn = document.querySelector('#btn-filter');
    filterBtn.addEventListener('click', function(evt) {
        // Prevent form submission
        evt.preventDefault();
    });

    // Reset filters button click
    const resetBtn = document.querySelector('#btn-reset');
    resetBtn.addEventListener('click', function(evt) {
        // Prevent form submission
        evt.preventDefault();
        // Reset Filters
        resetFilters();
        // Reset filters form
        const filtersForm = document.querySelector('#filters');
        filtersForm.reset();
        // Make sure price input enabled
        priceInputs.classList.remove('disabledinput');
    });

    // Listen for listing search events. Update search results when invoked.
    this.addEventListener('ListingSearch', evt => {
        if (evt.detail) {
            updateResults(evt.detail);
        }
    });
});


function initMap() {
    // Position that map will be focued on, will need to change this to the zip the user inputs
    var myLatLng = { lat: 47.632530, lng: -122.153737 };

    // Styles a map.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 11,
        styles: [
            // **********************Sin City theme**********************
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#c4c4c4"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#707070"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#be2026"
                    },
                    {
                        "lightness": "0"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff000a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#575757"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#999999"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": "-52"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
             // **********************Dark Theme**********************
            // { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            // { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            // { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            // {
            //     featureType: 'administrative.locality',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#d59563' }]
            // },
            // {
            //     featureType: 'poi',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#d59563' }]
            // },
            // {
            //     featureType: 'poi.park',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#263c3f' }]
            // },
            // {
            //     featureType: 'poi.park',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#6b9a76' }]
            // },
            // {
            //     featureType: 'road',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#38414e' }]
            // },
            // {
            //     featureType: 'road',
            //     elementType: 'geometry.stroke',
            //     stylers: [{ color: '#212a37' }]
            // },
            // {
            //     featureType: 'road',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#9ca5b3' }]
            // },
            // {
            //     featureType: 'road.highway',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#746855' }]
            // },
            // {
            //     featureType: 'road.highway',
            //     elementType: 'geometry.stroke',
            //     stylers: [{ color: '#1f2835' }]
            // },
            // {
            //     featureType: 'road.highway',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#f3d19c' }]
            // },
            // {
            //     featureType: 'transit',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#2f3948' }]
            // },
            // {
            //     featureType: 'transit.station',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#d59563' }]
            // },
            // {
            //     featureType: 'water',
            //     elementType: 'geometry',
            //     stylers: [{ color: '#17263c' }]
            // },
            // {
            //     featureType: 'water',
            //     elementType: 'labels.text.fill',
            //     stylers: [{ color: '#515c6d' }]
            // },
            // {
            //     featureType: 'water',
            //     elementType: 'labels.text.stroke',
            //     stylers: [{ color: '#17263c' }]
            // },
            // **********************Dark night vision theme**********************
            // {
            //     "featureType": "all",
            //     "elementType": "all",
            //     "stylers": [
            //         {
            //             "invert_lightness": true
            //         },
            //         {
            //             "saturation": "-9"
            //         },
            //         {
            //             "lightness": "0"
            //         },
            //         {
            //             "visibility": "simplified"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "landscape.man_made",
            //     "elementType": "all",
            //     "stylers": [
            //         {
            //             "weight": "1.00"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "all",
            //     "stylers": [
            //         {
            //             "weight": "0.49"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         },
            //         {
            //             "weight": "0.01"
            //         },
            //         {
            //             "lightness": "-7"
            //         },
            //         {
            //             "saturation": "-35"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels.text",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels.text.stroke",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         }
            //     ]
            // },
            // {
            //     "featureType": "road.highway",
            //     "elementType": "labels.icon",
            //     "stylers": [
            //         {
            //             "visibility": "on"
            //         }
            //     ]
            // }
        ]
    });
    // Place marker on lat & lng as defined above
    var buyerLocation = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "hello"
    });

    var sellersMap = {
        // location is Factoria
        seller1: {
            center: { lat: 47.5683, lng: -122.1693 },
        },
        // location is Kirkland
        seller2: {
            center: { lat: 47.6769, lng: -122.2060 }
        }
    };

    // Add the circle for this city to the map.
    for (var city in sellersMap) {
        var sellerCircles = new google.maps.Circle({
            strokeColor: '#010101',
            strokeOpacity: 0.4,
            strokeWeight: 1,
            fillColor: '#fcfcfc',
            fillOpacity: 0.35,
            map: map,
            center: sellersMap[city].center,
            radius: 2000
        });
    }
}