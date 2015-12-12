$(function() {
  var now     = new Date(),
      $cal    = $('.cal'),
      $days   = $('.cal-day', $cal),
      $audios = $('audio'),
      okDays  = [];

  var playAudio = function($day) {

    var $control = $('.fa', $day),
        day      = $day.data('day'),
        $audio   = $('#audio-xmas-2015-' + day),
        status   = $day.data('status');

    if ( status !== 'playing') {
      $audio[0].play();
      $control.removeClass('fa-play').addClass('fa-pause');
      $day.data('status', 'playing');
    }

  };

  var pauseAudio = function($day) {

    var $control = $('.fa', $day),
        day      = $day.data('day'),
        $audio   = $('#audio-xmas-2015-' + day),
        status   = $day.data('status');

    if ( status !== 'paused') {
      $audio[0].pause();
      $control.removeClass('fa-pause').addClass('fa-play');
      $day.data('status', 'paused');
    }

  };

  $days.each(function(){
    var $day = $(this),
        month = $day.data('month'),
        day = $day.data('day'),
        year = $day.data('year'),
        date = new Date(year, month, day);
    if (date && now >= date){
      $day.addClass('ok');
      okDays.push(day);
    }
  });

  $cal.on('click', '.cal-day.ok', function(event){
    if($(event.target).hasClass('cal-day-cover')){
      $(this).addClass('active');
    }
  });

  $cal.on('click', '.cal-day.active', function(event){
    var $day = $(this),
        status = $day.data('status');
    if(status=='playing'){
      pauseAudio($day);
    }
    else {
      playAudio($day);
    }
  });

  $audios.on('ended', function(event){
    var $this = $(this),
        day = $this.data('day'),
        nextDay = day + 1;

    var $day        = $('.cal-day[data-day="' + day + '"]'),
        $dayControl = $('.fa', $day),
        $nextDay    = $('.cal-day[data-day="' + ( okDays.indexOf(nextDay) !== -1 ? nextDay : 1 ) + '"]');

    $day.data('status', null);
    $day.removeClass('active');
    $dayControl.removeClass('fa-pause').addClass('fa-play');
    $nextDay.addClass('active');
    playAudio($nextDay);

  });

});
