var ohmage_dsu = "https://ohmage-omh.smalldata.io/dsu/";


// monthly assessment level select
function choiceClick(counter) {
  $('#picture .slick-next').trigger('click');
  $('#picture-array .slick-next').trigger('click');
  $('.image_number').html(counter + 1 + ' of 46');
  $('.slick-current').find('.overlay').addClass('click-overlay');
}

//monthly answer print image
function drawImage(counter, hard_activity_images, image_names) {
  var all_images = ['1_Bending_M', '2_Standing_up_from_couch_F', '3_Standing_up_M', '4_Running_F', '5_Walking_a_M', '6_Steep_Walking_F', '7_Walking_b_M', '8_Carring_upstair_M', '9_Downstair_M', '10_Upstair_M', '11_Uneven_surface_F', '12_Light_housework_F', '13_Moving_up_in_bed_F', '14_Getting_in_a_car_M', '15_Mopping_F', '16_Bending_M', '17_Biking_M', '18_Carring_downstair_M', '19_Commuting_a', '20_Typing_c', '21_Cooking_F', '22_Dog_walking_F', '23_Dog_walking_M', '24_Going_shopping', '25_Going_shopping_F', '26_Going shopping_M', '27_Holding_cup_M', '28_Lifting_M', '29_Opening_bottle_M', '30_Opening_door', '31_Opening_jar', '32_Printing_M', '33_Reading_M', '34_Sleeping', '35_Socilizing_a', '36_Socilizing_b', '37_Standing', '38_Standing_working_M', '39_Taking_Bath', '40_Taking_off_Socks', '41_Typing_a', '42_Typing_b', '43_Waiting_for_subway', '44_Walking', '45_Washing_hand_M', '46_Zipping'];
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
    return image_names
  }
}


// monthly answer add on
function printEvent(add_event) {
  var add_event_id = add_event.replace(/\s+/g, '_').toLowerCase();
  $('.activities-bottom').prepend('<div class="col-xs-4 monthly-image" id="'+ add_event_id +'"></div>');
  $('#'+ add_event_id).append('<img class="img-responsive" src="images/logo/yadl-background.png" >');
  $('#'+ add_event_id).append('<p>' + add_event + '</p>');
  $('#'+ add_event_id).append('<center class="overlay"></center>');
  $('#'+ add_event_id + ' .overlay').append('<img src="images/logo/yadl-blue-check.png">');
  $('#addition_event').val("");
}



// monthly answer POST
function postMonthlyActivities(monthly_image_names, monthly_event_names, token) {
  var current_time = moment().format();
  var json_monthly_hard_activities = {
    "header": {
      "schema_id": {
        "namespace": "omh",
        "name": "yadl-monthly-survey",
        "description": "hard activities",
        "version": "1.0"
      },
      "acquisition_provenance": {
        "source_name": "YADL",
        "modality": "self-reported"
      }
    },
    "body": {
      "activity_image": "monthly_image_names",
      "activity_names": "monthly_event_names"
    }
  }

  $.ajax({
    type: 'POST',
    url: ohmage_dsu + "dataPoints",
    headers: {
      "Authorization": "Bearer " + token,
    },
    data: {
      "header": {
        "schema_id": {
          "namespace": "omh",
          "name": "yadl-monthly-survey",
          "description": "hard activities",
          "version": "1.0"
        },
        "acquisition_provenance": {
          "source_name": "YADL",
          "modality": "self-reported"
        }
      },
      "body": {
        "activity_image": "monthly_image_names",
        "activity_names": "monthly_event_names"
      }
    },
    contentType: "application/json",
    dataType: "json"}).done(function(){
      console.log('Good');
    })
}
 // "creation_date_time": current_time,
// JSON.stringify({HardActivities: json_monthly_hard_activities}),

// daily answer section -- draw all monthly image list
function drawDailyImage() {
  var daily_image_list = ['1_Bending_M', '2_Standing_up_from_couch_F', '3_Standing_up_M','4_Running_F', '5_Walking_a_M', '6_Steep_Walking_F', '7_Walking_b_M', '8_Carring_upstair_M', '9_Downstair_M', '10_Upstair_M', '11_Uneven_surface_F'];
  $.each(daily_image_list, function(index, value) {
    $('.daily_render_part').prepend('<div class="col-xs-4 daily-image" id="'+ value +'"></div>');
    $('#'+ value).append('<img class="img-responsive" src="images/survey-images/' + value +'.jpg" >');
    $('#'+ value).append('<center class="overlay"></center>');
    $('#'+ value + ' .overlay').append('<img src="images/logo/yadl-blue-check.png">');
  });
}

// daily answer section -- draw all monthly event list
function drawDailyEvent() {
  var daily_event_list = ['thinking', 'talking', 'jumping'];
  $.each(daily_event_list, function(index, value) {
    var daily_event_id = value.replace(/\s+/g, '_').toLowerCase();
    $('.daily_render_part').prepend('<div class="col-xs-4 daily-image" id="'+ daily_event_id +'"></div>');
    $('#'+ daily_event_id).append('<img class="img-responsive" src="images/logo/yadl-background.png" >');
    $('#'+ daily_event_id).append('<p>' + value + '</p>');
    $('#'+ daily_event_id).append('<center class="overlay"></center>');
    $('#'+ daily_event_id + ' .overlay').append('<img src="images/logo/yadl-blue-check.png">');
  });
}

// daily answer section -- draw all selected event and image
function drawDailySelectedActivities() {
  var element_id = $(this).attr('id');
  var daily_selected_images = [];
  var daily_selected_events = [];
  console.log(element_id);
  $(this).children('.overlay').toggleClass('click-overlay');

  if ($(this).children().hasClass('click-overlay')) {
    if ($(this).find("p").length > 0) {
      var daily_event = element_id.replace('_', /\s+/g);
      $('.daily_show_part').prepend('<span class="daily_event" style="line-height: 1.8; word-wrap: normal; display: inline-block;" id="'+ element_id+ '_circle">'+ daily_event + '</span>');
      daily_selected_events.push(element_id);
      console.log(daily_selected_events);
    }else {
      $('.daily_show_part').append('<img class="img-circle" id="'+ element_id + '_circle' + '" style="height: 4em;" src="images/survey-images/' + element_id + '.jpg" >');
      daily_selected_images.push(element_id);
      console.log(daily_selected_images);
    }
  }else{
    if ($(this).find("p").length > 0) {
      var event_index = daily_selected_events.indexOf(element_id);
      daily_selected_events.splice(event_index, 1);
      var event_id = element_id.replace(/\s+/g, '_').toLowerCase();
      $('#' + event_id + '_circle').remove();
    }else {
      var image_index = daily_selected_images.indexOf(element_id);
      daily_selected_images.splice(image_index, 1);
      $('#' + element_id + '_circle').remove();
      console.log(daily_selected_images);
    }
  }
  return {
    daily_event_names: daily_selected_events,
    daily_image_names: daily_selected_images
  }
}

// daily answer POST request
function postDailyActivities(daily_event_names, daily_image_names, token) {
  var current_time = moment().format();
  var json_daily_hard_activities = {
    "header": {
      "creation_date_time": current_time,
      "schema_id": {
        "namespace": "omh",
        "name": "yadl-daily-survey",
        "description": "hard activities",
        "version": "1.0"
      },
      "acquisition_provenance": {
        "source_name": "YADL",
        "modality": "self-reported"
      }
    },
    "body": {
      "activity_image": daily_image_names,
      "activity_names": daily_event_names
    }
  }

  $.ajax({
    type: "POST",
    url: ohmage_dsu + "dataPoints",
    headers: {
      "Authorization": "Bearer " + token
    },
    data: json_daily_hard_activities,
    contentType: "application/json",
    dataType: "json",
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.log('Daily data is not posted');
      console.log(data);
    }
  })
}

;
