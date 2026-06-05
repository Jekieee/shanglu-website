(function () {
  const params = new URLSearchParams(window.location.search);
  const location = params.get('loc');
  const char = params.get('char');

  if (!location || !char || !isUnlocked(location, char)) {
    window.location.href = 'map.html';
    return;
  }

  document.getElementById('viewerTitle').textContent = `${char} · ${location}`;
  document.getElementById('viewerChar').textContent = char;
  document.getElementById('viewerLoc').textContent = location;
  document.getElementById('pdfFrame').src = `materials/${char}/${location}.pdf`;
  clearUnlocked(location, char);
})();
