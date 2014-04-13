$(function() {
  var numNames = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve'
  ];
  
  var time, s, m, h, ampm;

  var makeTime = function (){
    time = new Date(),
       s = time.getSeconds().toString(),
       m = time.getMinutes().toString(),
       h = time.getHours(),
      pm = 'am';
    if (h >= 12) {
      h -= 12;
      h = h === 0 ? 12 : h;
      ampm = 'pm'; 
    }
    // Seconds
    if (s.length === 1) {
      $('.second-0').attr('data-digit', numNames[0]);
      $('.second-1').attr('data-digit', numNames[s]);
    }
    else {
      $('.second-0').attr('data-digit', numNames[s[0]]);
      $('.second-1').attr('data-digit', numNames[s[1]]);
    }
    // Minutes
    if (m.length === 1) {
      $('.minute-0').attr('data-digit', numNames[0]);
      $('.minute-1').attr('data-digit', numNames[m]);
    }
    else {
      $('.minute-0').attr('data-digit', numNames[m[0]]);
      $('.minute-1').attr('data-digit', numNames[m[1]]);
    }
    // Hour
    $('.hour').attr('data-digit', numNames[h]);
  };

  var theClock = window.setInterval(makeTime, 500);
  
});
