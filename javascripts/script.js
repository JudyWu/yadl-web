$(document).ready(function(){
  var url_info = document.location.hash.substring(14);
  console.log(url_info);
  token = url_info.substring(0, 36).toString();
  console.log(token);
  // document.location.hash = '';
  var sign_in = document.getElementById('sign_in');
  var survey_options = document.getElementById('survey_options');
  var monthly_assessment = document.getElementById('monthly_assessment');
  var monthly_answer = document.getElementById('monthly_answer');
  var thank_you_page = document.getElementById('thank_you_page');
  var daily_assessment = document.getElementById('daily_assessment');

  if (!token) {
    sign_in.style.display = 'block';
  }else {
    survey_options.style.display = 'block';
  }

  // temporary solution for no Gmail sign in

  // survey choices options
  $('#monthly_survey').on('click', function() {
    monthly_assessment.style.display = 'block';
    survey_options.style.display = 'none';
    $('#picture').slick();
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
  });

  // daily answer
  $('#daily_survey').on('click', function() {
    daily_assessment.style.display = 'block';
    survey_options.style.display = 'none';
    drawDailyImage();
    drawDailyEvent();

    function getMonthlyActivities(token) {
      $.ajax({
        type: 'GET',
        url: ohmage_dsu + "dataPoints",
        headers: {
          "Authorization": "Bearer " + token,
        },
        success: function(data) {
          console.log(data);
        },
        error: function() {
          console.log('Could not get data');
        }
      });
    }
  });

  // monthly assessment section choice click
  var counter = 0;
  var hard_activity_images = [];
  var monthly_image_names = [];

  $('#easy-choice, #moderate-choice, .footer-skip').on('click', function(){
    counter ++;
    choiceClick(counter);
    drawImage(counter, hard_activity_images, monthly_image_names);
    return
  });

  $('#hard-choice').on('click', function() {
    counter ++;
    choiceClick(counter);
    hard_activity_images.push(counter);
    drawImage(counter, hard_activity_images, monthly_image_names);
    console.log(hard_activity_images);
  });



  //drawImage();

  // monthly-answer add on event
  var add_monthly_event;
  var monthly_event_names = [];

  $('#addition_event').on('keyup', function() {
    add_monthly_event = this.value;
  });

  $('#add-addon').click(function() {
    monthly_event_names.push(add_monthly_event);
    printEvent(add_monthly_event);
  });

  // images slick event and choice section
  var delete_activities = [];

  $('.activities-bottom').on('click', '.monthly-image', function() {
    var element_id = $(this).attr('id');
    $(this).children('.overlay').toggleClass('click-overlay');

    if ($('center').hasClass('click-overlay')) {
      $('.delete-button').css('display', 'block');
    }else{
      $('.delete-button').css('display', 'none');
    }

    if ($(this).children().hasClass('click-overlay')) {
      delete_activities.push(element_id);
      console.log(delete_activities);
    }else{
      var index = delete_activities.indexOf(element_id);
      delete_activities.splice(index, 1);
      console.log(delete_activities);
    }
  });

  $('.delete-button').click(function() {
    $.each(delete_activities, function(index, value){
      var activity_index = monthly_image_names.indexOf(value);
      if (activity_index < 0) {
        var event_index = monthly_event_names.indexOf(value);
        monthly_event_names.splice(event_index, 1);
        $('#' + value).remove();
      }else {
        monthly_image_names.splice(activity_index, 1);
        $('#' + value).remove();
      }
    });

    if ($('center').hasClass('click-overlay')) {
      $('.delete-button').css('display', 'block');
    }else{
      $('.delete-button').css('display', 'none');
    }
  });

  // monthly-answer POST request after clicking on the submit button

  $('.submit-button').click(function(){
    console.log(monthly_image_names);
    console.log(monthly_event_names);
    console.log(token);
    postMonthlyActivities(monthly_image_names, monthly_event_names, token);
    thank_you_page.style.display = 'block';
    monthly_answer.style.display = 'none';
  });

  $('.return_to_main_page').click(function(){
    sign_in.style.display = 'block';
    thank_you_page.style.display = 'none';
  });

  // daily answer add on event
  var add_daily_event;
  var daily_event_names = [];

  $('#addition_daily_event').on('keyup', function(){
    add_daily_event = this.value;
  });

  $('#add-daily-addon').click(function(){
    var add_daily_event_id = add_daily_event.replace(/\s+/g, '_').toLowerCase();
    $('.daily_show_part').prepend('<span class="daily_event" style="line-height: 1.8; word-wrap: normal; display: inline-block;">'+ add_daily_event + '</span>');
    $('#addition_daily_event').val("");
    daily_event_names.push(add_daily_event);
    console.log(daily_event_names);
  });

  //daily answer selected event
  $('.daily_render_part').on('click', '.daily-image', drawDailySelectedActivities);

  // daily-answer POST request after clicking on the Ok button

  $('.daily_submit_button').click(function(){
    thank_you_page.style.display = 'block';
    daily_assessment.style.display = 'none';
    var daily_image_names = drawDailySelectedActivities.daily_image_names;
    var daily_event_names = drawDailySelectedActivities.daily_event_names;
    postDailyActivities(daily_event_names, daily_image_names, token)
  });
});






