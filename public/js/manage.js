document.addEventListener('DOMContentLoaded', () => {
    // Update navbar active item to 'manage'
    updateNavActiveItem('manage');

    // Button click handler for deleting a listing
    $('#manageButton').on('click', function() {
        var sellerId = $('#itemPostingID')
            .val()
            .trim();
        deletePost(sellerId);
    });
});

//need to add if statement to verify that id exists and alert if it does not
function deletePost(sellerId) {
    $.ajax({
        method: 'DELETE',
        url: '/api/listings/' + sellerId
    }).then(function() {
        console.log('this post has been deleted');
        //need to make this a new view

        //window.location.href = "/manage";
        // alert('Thanks. Your post has been removed.')
        alertify.alert(
            'Item Removed',
            'Thank you. Your post has been deleted from Online Garage Sale.',
            function() {
                alertify.success('ok');
                window.location.href = '/';
            }
        );
    });
}
