window.onload = function() {
  console.log('hello');
}
var punchtime = document.querySelector('.punchtime')

punchtime.addEventListener('click', addTimeStamp)


function addTimeStamp(e) {
  var timeStamp = Date()
  console.log(timeStamp);
}

//ajax request
function request(methos, url, callback) {

  var r = new XMLHttpRequest()

}
