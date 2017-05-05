$(document).ready(function() {

  // toggle color for active tab on dashboard page
  $(".btn-pref .btn").click(function () {
      $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
      $(this).removeClass("btn-default").addClass("btn-primary");
  });
});
