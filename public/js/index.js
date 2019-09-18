
$(document).ready(function() {

  // Adding an event listener for when the form is submitted
  $(".newItem").on("submit", function handleFormSubmit(event) {
    event.preventDefault();


    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
   var sellerID = makeid(5);
   console.log(sellerID);

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
      contactZip: $("#newItemZipCode").val().trim(),
      isFree: false,
      contactEmail: $("#email").val().trim(),
      contactPhone: $("#phone").val().trim(),
    };
    alert('Thank you for posting an item. Your seller ID is ' + sellerID + '. Please save this ID as it will be required to remove your posting.')
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

    // phone number formatting
    $("#phone").keypress(function (e) {
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
      }
      var curchr = this.value.length;
      var curval = $(this).val();
      if (curchr == 3 && curval.indexOf("(") <= -1) {
        $(this).val("(" + curval + ")" + " ");
      } else if (curchr == 4 && curval.indexOf("(") > -1) {
        $(this).val(curval + ")-");
      } else if (curchr == 5 && curval.indexOf(")") > -1) {
        $(this).val(curval + "-");
      } else if (curchr == 9) {
        $(this).val(curval + "-");
        $(this).attr('maxlength', '14');
      }
    });




});
