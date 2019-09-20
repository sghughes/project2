$(document).ready(function() {
    // Update navbar active item to 'sell'
    updateNavActiveItem('sell');

    // Adding an event listener for when the form is submitted
    $('.newItem').on('submit', function handleFormSubmit(event) {
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

        console.log(newPost);
        submitPost(newPost);

        function submitPost(Listing) {
            $.post('/api/listings/', Listing, function(data) {
                console.log(data);
                alertify.alert(
                    'Item Posted',
                    'Thank you. our item has now been posted. Your seller ID is ' +
                        data +
                        '. Please save this ID for managing your item posting.',
                    function() {
                        alertify.success('ok');
                        window.location.href = '/';
                    }
                );
            });
        }
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
    //  const freeCheckbox = document.querySelector('#newIsFree');
    $('#newFreeItem').on('click', function() {
        console.log('clicked1');
        var check = $(this).prop('checked');
        if (check == true) {
            $('#newFreeItem').val(true);
            console.log($('#newFreeItem').val());
            newPriceInput.classList.add('disabledinput');
        }
        // else {
        //  newPriceInput.classList.remove('disabledinput');
        // }
    });
});
