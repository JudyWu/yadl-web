$(document).ready(function(){
  $('#picture-array').slick({
    // centerMode: true,
    centerPadding: '60px',
    slidesToShow: 12,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          // centerMode: true,
          centerPadding: '40px',
          slidesToShow: 8
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          // centerMode: true,
          centerPadding: '40px',
          slidesToShow: 8
        }
      }
    ]
  });

  $('#picture').slick();

  $('.monthly-image').click(function() {
    alert(this.id);
  });
});
