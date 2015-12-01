$(function() {
  var now = new Date();
  var $cal = $('.cal'),
      $days = $('.cal-day', $cal);

  $days.each(function(){
    var $day = $(this),
        month = $day.data('month'),
        day = $day.data('day'),
        year = $day.data('year'),
        date = new Date(year, month, day);
    if (date && now >= date){
      $day.addClass('ok');
    }
  });

  $cal.on('click', '.cal-day.ok', function(event){
    if($(event.target).hasClass('cal-day-cover')){
      $(this).addClass('active');
    }
  });

  $cal.on('click', '.cal-day.active', function(event){
    var $day = $(this),
        $control = $('.fa', $day),
        day = $day.data('day'),
        $audio = $('#audio-xmas-2015-' + day),
        status = $day.data('status');
    if(status=='playing'){
      $audio[0].pause();
      $control.removeClass('fa-pause').addClass('fa-play');
      $day.data('status', 'paused');
    }
    else {
      $audio[0].play();
      $control.removeClass('fa-play').addClass('fa-pause');
      $day.data('status', 'playing');
    }
  });

});
