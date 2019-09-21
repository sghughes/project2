function submitPost(Listing) {
    // First make sure zip code is valid
    const zipcode = $('#newItemZipCode')
        .val()
        .trim();
    $.get(`/api/locations/${zipcode}`, function() {
        // Zip code found, continue with new listing post
        $.post('/api/listings/', Listing, function(data) {
            // Create alert to notify seller with their ID
            alertify.alert(
                'Item Posted',
                'Thank you. our item has now been posted. Your Seller ID is ' +
                    data +
                    '. Please save this ID for managing your item listing.',
                function() {
                    alertify.success('Listing Created');
                    window.location.href = '/';
                }
            );
        }).fail(function(response) {
            console.log(response);
            alertify.alert('Post Failed',
                'Could not post item. Message: ' + response,
                function() {
                    alertify.error('Error encountered');
                }
            );
        });
    }).fail(function() {
        alertify.alert(
            'Invalid Zip Code',
            `${zipcode} is not a valid zip code. Please try again.`,
            function() {
                alertify.error('Error encountered');
            }
        );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Update navbar active item to 'sell'
    updateNavActiveItem('sell');

    // Adding an event listener for when the form is submitted
    $('.newItem').on('submit', function(event) {
        event.preventDefault();

        var checkBox;
        if (
            $('#newItemPrice')
                .val()
                .trim() == 0
        ) {
            checkBox == true;
        } else {
            checkBox == false;
        }

        var itemProps = {
            size: $('#newItemSize')
                .val()
                .toLowerCase(),
            category: $('#newItemClothingType')
                .val()
                .trim()
                .toLowerCase(),
            color: $('#newItemColor')
                .val()
                .toLowerCase(),
            gender: $('#newItemGender')
                .val()
                .toLowerCase()
        };

        // Constructing a newPost object to hand to the database
        var newPost = {
            title: $('#newItemTitle')
                .val()
                .trim(),
            description: $('#newItemDescription')
                .val()
                .trim(),
            image: $('#newItemImageUrl')
                .val()
                .trim(),
            itemQuality: $('#itemQuality').val(),
            properties: JSON.stringify(itemProps),
            isFree: checkBox,
            price: $('#newItemPrice')
                .val()
                .trim(),
            contactZip: $('#newItemZipCode')
                .val()
                .trim(),
            contactEmail: $('#email')
                .val()
                .trim(),
            contactPhone: $('#phone')
                .val()
                .trim()
        };

        submitPost(newPost);
    });

    // phone number formatting
    $('#phone').keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
        var curchr = this.value.length;
        var curval = $(this).val();
        if (curchr == 3 && curval.indexOf('(') <= -1) {
            $(this).val('(' + curval + ')' + ' ');
        } else if (curchr == 4 && curval.indexOf('(') > -1) {
            $(this).val(curval + ')-');
        } else if (curchr == 5 && curval.indexOf(')') > -1) {
            $(this).val(curval + '-');
        } else if (curchr == 9) {
            $(this).val(curval + '-');
            $(this).attr('maxlength', '14');
        }
    });

    // Free only checkbox
    $('#newFreeItem').on('click', function() {
        var checked = $(this).prop('checked');
        if (checked === true) {
            $('#newPriceInput').addClass('disabledinput');
            $('#newItemPrice').val(0);
        } else {
            $('#newPriceInput').removeClass('disabledinput');
        }
    });
});
