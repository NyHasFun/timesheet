
//  punchtime
// timeStamp
// stars


//punchtime
var clockins = document.querySelectorAll('.punchtime')

for (var i = 0; i < clockins.length; i++) {
  clockins[i].addEventListener('click', addTimeStamp)
}

function addTimeStamp(e) {
  var timeStamp = new Date()
  var time =  {}
  if(this.dataset.punchtype === 'in'){
    time = {startTime: timeStamp}
  }else if(this.dataset.punchtype === 'out'){
    time = {endTime: timeStamp}
  };
  $.ajax({
    type: 'POST',
    url: '/shifts',
    data: time,
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

function timeStamp() {
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


timeStamp()
toStars()
