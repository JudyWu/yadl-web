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
    $(this).find('.overlay').toggleClass('click-overlay');
    if ($('.monthly-image .overlay').hasClass('click-overlay')) {
      $('.submit-button p').replaceWith('<p>Delete</p>');
      $('.submit-button').css('background-color', 'rgb(255, 59, 48)');
    }else {
      $('.submit-button p').replaceWith('<p>Submit</p>');;
      $('.submit-button').css('background-color', 'rgb(3, 122, 255)');
    }
  })

  var counter = 0;

  $('#easy-choice').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    if (counter >= 11) {
      window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });

  $('#moderate-choice').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    if (counter >= 11) {
      window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });

  $('#hard-choice').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    if (counter >= 11) {
      window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });

  $('.footer-skip').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    if (counter >= 11) {
      window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });






  // var dir="http://localhost:4567/images/logo/";
  // var fileextension = ".jpg";

  // $.ajax({
  //   url: dir,
  //   success: function(data) {
  //     $(data).find("a:contains("+fileextension+")").each(function() {
  //       var filename = this.href.replace(window.location, "").replace("http://", "");
  //       $("#picture-array").append($("<img src=" + dir + filename +"></img>"));
  //     });
  //   }
  // })
});
