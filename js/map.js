(function () {
  const modal = document.getElementById('unlockModal');
  const modalTitle = document.getElementById('modalTitle');
  const unlockInput = document.getElementById('unlockInput');
  const unlockSubmit = document.getElementById('unlockSubmit');
  const unlockError = document.getElementById('unlockError');
  const modalClose = document.getElementById('modalClose');
  let currentLocation = '';

  document.querySelectorAll('.map-hotspot').forEach((spot) => {
    spot.addEventListener('click', () => openModal(spot.dataset.location));
  });

  function openModal(location) {
    currentLocation = location;
    modalTitle.textContent = `解锁 · ${location}`;
    unlockInput.value = '';
    unlockError.textContent = '';
    modal.classList.add('active');
    unlockInput.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    currentLocation = '';
  }

  function tryUnlock() {
    const result = verifyPassword(currentLocation, unlockInput.value);
    if (!result) {
      unlockError.textContent = '解锁码错误，请重试';
      return;
    }
    setUnlocked(result.location, result.char);
    window.location.href = `viewer.html?loc=${encodeURIComponent(result.location)}&char=${encodeURIComponent(result.char)}`;
  }

  unlockSubmit.addEventListener('click', tryUnlock);
  unlockInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlock();
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
