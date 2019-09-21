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

// Add event listeners and perform necessary initializtion
// once page content is loaded.
document.addEventListener('DOMContentLoaded', () => {
    updateNavActiveItem('buy');

    // Check for passed url parameters
    let item = getQueryVariable('item');

    const location = getUserLocation();
    if (location) {
        let queryString = `zipSrc=${location.zipcode}&distance=10`;
        if (item) {
            queryString += `&item=${item}`
        }
        fetch(`/listings/search?${queryString}`)
            .then(response => {
                return response.text();
            })
            .then(
                html =>
                    (document.querySelector('#search-results').innerHTML = html)
            )
            .catch(err => {
                console.log('Error fetching search results: ', err);
            });
    }

    // Get distance slider and distOutput field
    const distSlider = document.querySelector('#range-distance');
    const distLabel = document.querySelector('#label-distance');

    // Update the current distance value
    distSlider.addEventListener('input', function() {
        const distLbl =
            this.value == 0 ? 'Any distance' : `Within ${this.value} miles`;
        distLabel.innerHTML = distLbl;
        Filters.distance = this.value;
    });

    // Get min/max price inputs. Disable if 'Free Only' checked.
    const priceInputs = document.querySelector('#input-prices');
    const minPrice = document.querySelector('#min-price');
    const maxPrice = document.querySelector('#max-price');

    // Min price input
    minPrice.addEventListener('input', function() {
        const min = parseFloat(this.value);
        Filters.minPrice = min;
    });

    // Max price input
    maxPrice.addEventListener('input', function() {
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

    // Filter button handler
    const filterButton = document.querySelector('#btn-filter');
    filterButton.addEventListener('click', evt => searchHandler(evt));

    // Reset filters button click
    const resetBtn = document.querySelector('#btn-reset');
    resetBtn.addEventListener('click', function(evt) {
        // Prevent form submission
        evt.preventDefault();
        // Reset Filters
        resetFilters();
        distLabel.innerHTML = Filters.distance;
        // Reset filters form
        const filtersForm = document.querySelector('#filters');
        filtersForm.reset();
        // Make sure price input enabled
        priceInputs.classList.remove('disabledinput');
    });

    $(window).keydown(function(evt){
        if(event.keyCode == 13) {
          searchHandler(evt)
          return false;
        }
    });
});
