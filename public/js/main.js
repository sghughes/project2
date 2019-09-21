// Update nav active item
function updateNavActiveItem(page) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    navItems.forEach(item => {
        if (item.id === `nav-${page}`) {
            item.classList.add('active');
        }
    });
}

// Display current location in navbar
function updateCurrentLocation(location) {
    sessionStorage.setItem('location', JSON.stringify(location));

    const locationElm = document.querySelector('#current-location');
    const locationName = document.querySelector('#location-name');

    if (location && location.name) {
        locationElm.classList.remove('hiddeninput');
        locationName.innerHTML = ' ' + location.name;
    } else {
        locationElm.classList.add('hiddeninput');
        locationName.innerHTML = '';
    }
}

// Get the current location of the user.
function getUserLocation() {
    // First check session storage
    const storedLocation = sessionStorage.getItem('location');
    try {
        const parsed = JSON.parse(storedLocation);
        if (parsed && parsed.name) {
            updateCurrentLocation(parsed);
            return parsed;
        }
    } catch (err) {
        console.log('Error parsing location data from session storage', err);
    }

    let location = {};

    // Determine location of user through geolocation (if supported).
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                location = {
                    accuracy: position.coords.accuracy,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                fetch(
                    `/api/locations/${location.latitude}/${location.longitude}`
                )
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        updateCurrentLocation(data);
                    })
                    .catch(err => {
                        console.log('Error updating current location', err);
                    });
            },
            error => {
                if (
                    error.code === error.PERMISSION_DENIED ||
                    error.code === error.POSITION_UNAVAILABLE
                ) {
                    // Could not get location, or denied permission -> ask for zip code
                    promptForZip();
                }
            }
        );
    } else {
        // Cannot geolocate user, determine location by zip code
        promptForZip();
    }
}

// Open a prompt to get user zip code
function promptForZip() {
    // Prompt for valid zip code until given
    alertify
        .prompt()
        .setting({
            title: 'Where are you located?',
            message:
                'Please enter your zip code to search for nearby listings.',
            closable: false,
            closableByDimmer: false,
            movable: false,
            labels: { ok: 'Submit' },
            type: 'text',
            keepOpen: true,
            onok: async function(evt, value) {
                this.keepOpen = true;
                const input = parseInt(value.trim());
                if (!input) {
                    alertify.error('Invalid zip code');
                    return;
                }

                // Potentially valid zip, verify with api request.
                try {
                    const response = await fetch(`/api/locations/${input}`);
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    const location = await response.json();

                    // Update session storage
                    sessionStorage.setItem(
                        'location',
                        JSON.stringify(location)
                    );
                    updateCurrentLocation(location);

                    // Display success
                    this.keepOpen = false;
                    alertify.success('Thank you!');
                    alertify.closeAll();
                } catch (err) {
                    this.keepOpen = true;
                    alertify.error(err.message);
                }
            },
            oncancel: function() {
                this.keepOpen = true;
                alertify.error('Zip code required');
            },
            onclosing: function() {
                if (this.keepOpen === true) {
                    return false;
                }
                return true;
            }
        })
        .show();
}

async function searchListings() {
    // Get search input and location
    const searchItem = document.querySelector('#input-search').value.trim();
    const location = getUserLocation();

    // Create the search parameter query string
    let searchParams = [];
    if (searchItem && searchItem !== '') {
        searchParams.push(`item=${searchItem}`);
    }
    if (location) {
        searchParams.push(`zipSrc=${location.zipcode}`);
    }
    if (typeof Filters !== 'undefined') {
        Object.entries(Filters).forEach(([key, value]) => {
            searchParams.push(`${key}=${value}`);
        });
    }

    let paramString = searchParams.join('&');
    if (paramString.length > 0) {
        paramString = '?' + paramString;
    }

    // If performing a search from a different view, then
    // redirect to listings view
    if (window.location.pathname !== '/listings') {
        window.location.assign('/listings' + paramString);
        return;
    }

    // Perform GET request to find matching listings
    try {
        const response = await fetch('/listings/search' + paramString);
        const text = await response.text();

        document.querySelector('#search-results').innerHTML = text;
    } catch (err) {
        console.log('ERROR searching for listings', err, paramString);
    }
}

function searchHandler(evt) {
    evt.preventDefault();
    searchListings();
}

function getQueryVariable(variable) {
	const query = window.location.search.substring(1);
    const pair = query.split("&").find(v => v.includes(variable));
    return pair ? pair.split('=')[1] : false;
}

document.addEventListener('DOMContentLoaded', () => {
    // Determine location of user
    getUserLocation();

    // Search button click event handler
    const searchButton = document.querySelector('#btn-search');
    searchButton.addEventListener('click', evt => searchHandler(evt));
});
