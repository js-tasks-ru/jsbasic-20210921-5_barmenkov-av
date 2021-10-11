function toggleText() {
const elem = document.getElementById('text');
const but = document.querySelector('.toggle-text-button');
but.addEventListener('click', event => {
  elem.hidden = !elem.hidden;
});
}
