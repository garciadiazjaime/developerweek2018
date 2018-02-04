var btnFb = document.getElementById('btn-facebook');

btnFb.addEventListener('click', function () {
  const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u='
  window.open(`${fbUrl}${pins.getUrl()}`, '_blank');
});

