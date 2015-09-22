$(document).ready(function(){
  var token = document.location.hash.substring(14);
  console.log(token);
  document.location.hash = '';
  sign_in = document.getElementById('sign_in');
  survey_options = document.getElementById('survey_options');
  monthly_assessment = document.getElementById('monthly_assessment');
  monthly_answer = document.getElementById('monthly_answer');
  thank_you_page = document.getElementById('thank_you_page');

  if (!token) {
    sign_in.style.display = 'block';
  }else {
    survey_options.style.display = 'block';
  }
 // monthly-assessment images slick

  $('.log-in-google').click(function(){
    survey_options.style.display = 'block';
    sign_in.style.display = 'none';
    token='7375987458427';
  })

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

  // survey choices options
  $('#monthly_survey').click(function() {
    monthly_assessment.style.display = 'block';
    survey_options.style.display = 'none';
  });

  // monthly-answer add on event
  var add_event;
  var event_names = [];

  $('#addition_event').on('keyup', function() {
    add_event = this.value;
  });

  function printEvent() {
    event_names.push(add_event);
    var add_event_id = add_event.replace(/\s+/g, '_').toLowerCase();
    $('.activities-bottom').prepend('<div class="col-xs-4 monthly-image" id="'+ add_event_id +'"></div>');
    $('#'+ add_event_id).append('<img class="img-responsive" src="images/logo/yadl-background.png" >');
    $('#'+ add_event_id).append('<p>' + add_event + '</p>');
    $('#'+ add_event_id).append('<center class="overlay"></center>');
    $('#'+ add_event_id + ' .overlay').append('<img src="images/logo/yadl-blue-check.png">');
    $('#addition_event').val("");
  }

  $('#add-addon').click(function() {
    printEvent();
  });

  // images slick event and choice section

  $('#picture').slick();

  var counter = 0;
  var hard_activity_images = [];
  var all_images = ['1_Bending_M', '2_Standing_up_from_couch_F', '3_Standing_up_M', '4_Running_F', '5_Walking_a_M', '6_Steep_Walking_F', '7_Walking_b_M', '8_Carring_upstair_M', '9_Downstair_M', '10_Upstair_M', '11_Uneven_surface_F', '12_Light_housework_F', '13_Moving_up_in_bed_F', '14_Getting_in_a_car_M', '15_Mopping_F', '16_Bending_M', '17_Biking_M', '18_Carring_downstair_M', '19_Commuting_a', '20_Commuting_b', '21_Cooking_F', '22_Dog_walking_F', '23_Dog_walking_M', '24_Going_shopping', '25_Going_shopping_F', '26_Going shopping_M', '27_Holding_cup_M', '28_Lifting_M', '29_Opening_bottle_M', '30_Opening_door', '31_Opening_jar', '32_Printing_M', '33_Reading_M', '34_Sleeping', '35_Socilizing_a', '36_Socilizing_b', '37_Standing', '38_Standing_working_M', '39_Taking_Bath', '40_Taking_off_Socks', '41_Typing_a', '42_Typing_b', '43_Waiting_for_subway', '44_Walking', '45_Washing_hand_M', '46_Zipping'];
  var image_names = [];
  drawImage();

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
      var activity_index = image_names.indexOf(value);
      if (activity_index < 0) {
        var event_index = event_names.indexOf(value);
        event_names.splice(event_index, 1);
        $('#' + value).remove();
      }else {
        image_names.splice(activity_index, 1);
        $('#' + value).remove();
      }
    });

    if ($('center').hasClass('click-overlay')) {
      $('.delete-button').css('display', 'block');
    }else{
      $('.delete-button').css('display', 'none');
    }
  });

  function choiceClick() {
    $('#picture .slick-next').trigger('click');
    $('.img-overlay').find('.click-overlay').parent().next().find('.overlay').addClass('click-overlay');
    $('#picture-array .slick-next').trigger('click');
    counter ++;
    $('.image_number').html(counter + 1 + ' of 46');
    return counter;
  }

  function drawImage() {
    if (counter >= 46) {
      monthly_answer.style.display = 'block';
      monthly_assessment.style.display = 'none';

      if (hard_activity_images.length !== 0 ){
        $.each(hard_activity_images, function(index, value) {
          image_names.push(all_images[Number(value - 1)]);
        });
        $.each(image_names, function(index, value) {
          $('.activities-bottom').append('<div class="col-xs-4 monthly-image" id="'+ value +'"></div>');
          $('#'+ value).append('<img class="img-responsive" src="images/survey-images/' + value +'.jpg" >');
          $('#'+ value).append('<center class="overlay"></center>');
          $('#'+ value + ' .overlay').append('<img src="images/logo/yadl-blue-check.png">');
        });
      }
    }
  }

  $('#easy-choice').click(function(){
    choiceClick();
    drawImage();
  });

  $('#moderate-choice').click(function(){
    choiceClick();
    drawImage();
  });

  $('#hard-choice').click(function() {
    choiceClick();
    hard_activity_images.push(counter);
    drawImage();
    console.log(hard_activity_images);
  });

  $('.footer-skip').click(function(){
    choiceClick();
    drawImage();
  });



  // monthly-answer POST request after clicking on the submit button

  var json_hard_activities;
  var ohmage_dsu = "https://ohmage-omh.smalldata.io/dsu/";

  $('.submit-button').click(function(){
    thank_you_page.style.display = 'block';
    monthly_answer.style.display = 'none';

    json_hard_activities = {
      "header": {
        "creation_date_time": moment().format(),
        "schema_id": {
          "namespace": "omh",
          "name": "yadl-survey",
          "description": "hard activities",
          "version": "1.0"
        },
        "acquisition_provenance": {
          "source_name": "YADL",
          "modality": "self-reported"
        }
      },
      "body": {
        "activity_image": image_names,
        "activity_names": event_names
      }
    };

    $.ajax({
      type: "POST",
      url: ohmage_dsu + "dataPoints",
      headers: {
        "Authorization": "Bearer "
      },
      data: JSON.stringify({HardActivities: json_hard_activities}),
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        console.log(data);
      },
      error: function() {
        console.log('Not posting the data');
        console.log(json_hard_activities);
      }
    });
  });

  $('.return_to_main_page').click(function(){
    sign_in.style.display = 'block';
    thank_you_page.style.display = 'none';
  });
});





