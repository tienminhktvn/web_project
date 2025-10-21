$(document).ready(function () {
  function updateGradient() {
    var firstColor = $("#first-color").val();
    var secondColor = $("#second-color").val();

    var gradient =
      "linear-gradient(to right, " + firstColor + ", " + secondColor + ")";

    $("body").css("background-image", gradient);
  }

  $("#first-color, #second-color").on("change", function () {
    updateGradient();
  });

  updateGradient();
});
