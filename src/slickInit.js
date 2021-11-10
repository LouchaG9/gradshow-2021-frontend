// slick slider init
// https://kenwheeler.github.io/slick/
// lots more options we can play with here for responsiveness ect.

$(document).ready(function () {
  $(".image-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: true,
    variableWidth: true
  });
  console.log("slick init");
});
