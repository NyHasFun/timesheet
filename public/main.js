window.onload = function() {
  console.log('hello');
}
var p_in = document.querySelector('.punch_in')
var p_out = document.querySelector('.punch_out')

p_in.addEventListener('click', function() {
  console.log(Date());
})
