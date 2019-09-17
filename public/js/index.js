
$(document).ready(function() {
  // Adding an event listener for when the form is submitted
  $(".newItem").on("submit", function handleFormSubmit(event) {
    event.preventDefault();

   var itemProps = {
      size: $('#newItemSize').val().toLowerCase(),
      category: $("#newItemClothingType").val().trim().toLowerCase(),
      color: $('#newItemColor').val().toLowerCase(),
      gender: $('#newItemGender').val().toLowerCase()
   };

    // Constructing a newPost object to hand to the database
    var newPost = {
      title: $("#newItemTitle").val().trim(),
      description: $("#newItemDescription").val().trim(),
      image: $('#newItemImageUrl').val().trim(),
      item_quality: $("#newItemCondition").val(),
      properties: JSON.stringify(itemProps),
      price: $("#newItemPrice").val().trim(),
      isFree: false,
      contactZip: $("#newItemZipCode").val(),
      contactEmail: $("#email").val().trim(),
      contactPhone: $("#phone").val().trim(),
    };
    console.log(newPost);
    submitPost(newPost);
  // Submits a new post and brings user to blog page upon completion
  function submitPost(Listing) {
    $.post("/api/listings/", Listing, function() {
      window.location.href = "/form";
      console.log("new post is done")
    });
  };

  });

  $("#manageButton").on("click", handlePostDelete);
  function handlePostDelete(){
    var currentPost = $("#itemPostingID").val().trim();
    console.log(currentPost);
    deletePost(currentPost);
  };
  //need to add if statement to verify that id exists and alert if it does not
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/listings/" + id
    })
    .then(function(){
      console.log('this post has been deleted')
      alert('Thanks. Your post has been removed.')
    })
  }
});
