
// clockin
// timeStamp
// stars
// COUNTDOWN


//CLOCK-IN
var clockin = document.querySelector('.clockin')

clockin.addEventListener('click', addClockIn)

function addClockIn(e) {
  var timeStamp = new Date()
  $.ajax({
    type: 'POST',
    url: '/clockin',
    data: {startTime: timeStamp},
    success: function(data, textStatus, jqXHR){
      if(typeof data.redirect == 'string'){
        window.location = data.redirect
      }
    }
  })
}

//CLOCK-OUT
var clockout = document.querySelector('.clockout')

clockout.addEventListener('click', addClockOut)

function addClockOut(e) {
  var timeStamp = new Date()
  $.ajax({
    type: 'POST',
    url: '/clockout',
    data: {endTime: timeStamp},
    success: function(data, textStatus, jqXHR){
      if(typeof data.redirect == 'string'){
        window.location = data.redirect
      }
    }
  })
}


//HandleTime
var js_time = document.querySelectorAll('.js_time')
var ppl_time = document.querySelectorAll('.ppl_time')

function fixTimeStamp() {
  for (var i = 0; i < js_time.length; i++) {
    createTime(js_time[i].innerHTML, ppl_time[i])
  }
}

function createTime(time, location) {
  // Create a date object with the current time
  var current = new Date(time);
  if (current == 'Invalid Date' ) return

  // Create an array with the current month, day and time
  var date = [ current.getMonth() + 1, current.getDate(), current.getFullYear() ];

  // Create an array with the current hour, minute and second
  var time = [ current.getHours(), current.getMinutes(), current.getSeconds() ];

  // Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

  // Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
  location.innerHTML = date.join("/") + " " + time.join(":") + " " + suffix;
  // Return the formatted string
  //return date.join("/") + " " + time.join(":") + " " + suffix;
}


// stars
var productivity = document.querySelectorAll('.productivity')
var stars = document.querySelectorAll('.stars')

function toStars() {
  for (var i = 0; i < productivity.length; i++) {
    createStars(parseInt(productivity[i].innerHTML,10),stars[i])
  }
}

function createStars(number, location) {
  for (var i = 0; i < number; i++) {
    location.innerHTML += '&#10029;'
  }
  for (var i = 0; i < 5-number; i++) {
    location.innerHTML += '&#10025;'
  }
}

//COUNTDOWN

var deadline = document.querySelector('.deadline').innerHTML;

function getTimeRemaining(endtime){
  var t = Date.parse(endtime)+(8*60*60*1000) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24);
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

getTimeRemaining(deadline).minutes

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var offSet = 0
  function updateClock(){
  var t = getTimeRemaining(endtime);
  if (t.total>0) {
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  }


  if(t.total<=0){
    clock.innerHTML = "Deadline has passed"
    clearInterval(timeinterval);
  }
}

updateClock(); // run function once at first to avoid delay
var timeinterval = setInterval(updateClock,1000);
}

initializeClock('clockdiv', deadline);




fixTimeStamp()
toStars()
