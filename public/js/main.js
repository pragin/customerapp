  $(document).ready(function() {
    $('.deleteUser').on('click', deleteUser);
      //event.preventDefault();
  });

  function deleteUser() {
    var confirmation = confirm("Are you sure?");

    if(confirmation){
      $.ajax({
        url: '/users/delete/' + $(this).data('id'),
        type: 'DELETE',
      }).done(function(response){
           window.location.replace('/');
      }).fail(function(xhr, status, errorThrown){
        console.log("Sorry there was a problem");
        console.log("error: " + errorThrown);
        console.log("Status: " + status);

      });
      window.location.replace('/');
    }else{
      return false;
    }
  }
