var btnFb = document.getElementById('btn-facebook');

btnFb.addEventListener('click', function () {
  const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u='
  const shareUrl = `${fbUrl}${pins.getUrl()}`
  window.open(shareUrl, '_blank')
  console.log(encodeURI(pins.getUrl()))
});

