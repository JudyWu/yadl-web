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
  var hard_activity_images = [];

  $('#easy-choice').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    $('.image_number').html(counter + 1 + ' of 46');
    if (counter >= 46) {
      window.location.href = "http://localhost:4567/monthly-answer/index.html?" + hard_activity_images;
      // $('.image_array_numbers').data(hard_activity_images);
      document.getElementByClassName("image_array_numbers").setAttribute('data-', 'hard_activity_images');
      // window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });

  $('#moderate-choice').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    $('.image_number').html(counter + 1 + ' of 46');
    if (counter >= 46) {
      window.location.href = "http://localhost:4567/monthly-answer/index.html?" + hard_activity_images;
      document.getElementByClassName("image_array_numbers").setAttribute('data', 'hard_activity_images');
      // $('.image_array_numbers').data(hard_activity_images);
      // window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });

  $('#hard-choice').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    hard_activity_images.push(counter);
    console.log(hard_activity_images);
    $('.image_number').html(counter + 1 + ' of 46');
    if (counter >= 46) {
      window.location.href = "http://localhost:4567/monthly-answer/index.html?" + hard_activity_images;
      document.getElementByClassName("image_array_numbers").setAttribute('data', 'hard_activity_images');
      // $('.image_array_numbers').data(hard_activity_images);
      // window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });

  $('.footer-skip').click(function() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    $('.image_number').html(counter + 1 + ' of 46');
    if (counter >= 46) {
      window.location.href = "http://localhost:4567/monthly-answer/index.html?" + hard_activity_images;
      // $('.image_array_numbers').data(hard_activity_images);
      document.getElementByClassName("image_array_numbers").setAttribute('data', 'hard_activity_images');
      // window.location.href = "http://judywu.github.io/yadl-web/monthly-answer/index.html";
    }
  });


});
