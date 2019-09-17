document.addEventListener('DOMContentLoaded', () => {
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
                searchParams += `&${key}=${value}`
            });
        }

        // Perform GET request to find matching listings
        try {
            const response = await fetch('/api/listings' + searchParams);
            const data = await response.json();

            // Fire new ListingSearch event for Listeners to handle
            const searchEvent = new CustomEvent("ListingSearch", {
                detail: data
            });
            this.dispatchEvent(searchEvent);

        } catch (err) {
            console.error('ERROR searching for listings', err);
        }
    });
});
