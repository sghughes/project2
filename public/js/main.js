// Get the current location of the user.
function getUserLocation() {
    let location = {};

    // Determine location of user through geolocation (if supported).
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            location = {
                accuracy: position.coords.accuracy,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            sessionStorage.setItem('position', JSON.stringify(location));
        });
    } else {
        // Cannot geolocation user, determine location by zip code
        // TODO prompt for zip
        const zip = promptForZip(); // TODO - Get from user input (modal)
        location = getPositionByZip(zip);
        sessionStorage.setItem('position', JSON.stringify(location));
    }
}

// Look up geolocation by zip code
function getPositionByZip(zipcode) {
    // TODO - replace temp test data
    return {
        accuracy: 10,
        latitude: 47.6694141,
        longitude: -122.1238767
    }
}

// Open a prompt to get user zip code
function promptForZip() {
    // TODO - replace temp test data
    return 98052;
}

document.addEventListener('DOMContentLoaded', () => {
    // Determine location of user
    getUserLocation();

    // Search button click event handler
    const searchButton = document.querySelector('#btn-search');
    searchButton.addEventListener('click', async evt => {
        // Prevent form submission
        evt.preventDefault();

        // Make sure search input is supplied. If not, do nothing (exit early)
        const searchItem = document.querySelector('#input-search').value.trim();
        if (searchItem === '') {
            return;
        }

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
            const response = await fetch('/api/listings' + searchParams);
            const data = await response.json();

            // Fire new ListingSearch event for Listeners to handle
            const searchEvent = new CustomEvent('ListingSearch', {
                detail: data
            });
            this.dispatchEvent(searchEvent);
        } catch (err) {
            console.log('ERROR searching for listings', err);
        }
    });
});
