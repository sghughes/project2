// Get the current location of the user.
function getUserLocation() {
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
                sessionStorage.setItem('location', JSON.stringify(location));
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
function promptForZip(update = false) {
    // First check session storage
    if (update === false) {
        const storedLocation = sessionStorage.getItem('location');
        try {
            const parsed = JSON.parse(storedLocation);
            if (parsed) {
                return;
            }
        } catch(err) {
            console.log('Error parsing location data from session storage', err);
        }
    }

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

    // Get search input
    const searchItem = document.querySelector('#input-search').value.trim();

    // Check to see if filters are defined (from separate view).
    // If found, append to API request query string
    let searchParams = `?item=${searchItem}`;
    if (typeof Filters !== 'undefined') {
        Object.entries(Filters).forEach(([key, value]) => {
            searchParams += `&${key}=${value}`;
        });
    }

    // Perform GET request to find matching listings
    try {
        const response = await fetch('/listings/search' + searchParams);
        const text = await response.text();
        document.querySelector('#search-results').innerHTML = text;
    } catch (err) {
        console.log('ERROR searching for listings', err, searchParams);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Determine location of user
    getUserLocation();

    // Search button click event handler
    const searchButton = document.querySelector('#btn-search');
    searchButton.addEventListener('click', evt => {
        // Prevent form submission
        evt.preventDefault();
        searchListings();
    });
});
