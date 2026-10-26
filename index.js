'use strict';


(function () {
  const photoSlots = document.querySelectorAll('[data-photo-slot]');
  const revealItems = document.querySelectorAll('.reveal');
  const yesButton = document.getElementById('yesButton');
  const thinkButton = document.getElementById('thinkButton');
  const answerMessage = document.getElementById('answerMessage');

  /** Показывает фотографию только после успешной загрузки файла. */
  function initializePhotoSlots() {
    photoSlots.forEach((slot) => {
      const image = slot.querySelector('[data-photo-image]');
      if (!image) return;

      const showImage = () => slot.classList.add('has-photo');
      const showPlaceholder = () => slot.classList.remove('has-photo');

      image.addEventListener('load', showImage);
      image.addEventListener('error', showPlaceholder);

      // Учитывает ситуацию, когда браузер загрузил изображение до запуска скрипта.
      if (image.complete && image.naturalWidth > 0) {
        showImage();
      } else if (image.complete) {
        showPlaceholder();
      }
    });
  }

  /** Включает анимацию появления блоков, если она поддерживается браузером. */
  function initializeReveal() {
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
  }

  /** Выводит выбранный ответ рядом с вопросом и переводит к нему фокус чтения. */
  function showAnswer(message) {
    if (!answerMessage) return;

    answerMessage.textContent = message;
    answerMessage.hidden = false;
  }

  function initializeQuestion() {
    if (yesButton) {
      yesButton.addEventListener('click', () => {
        showAnswer('Тогда пусть это будет началом нашей красивой истории. Люблю тебя, Лисёнок)) ♡');
      });
    }

    if (thinkButton) {
      thinkButton.addEventListener('click', () => {
        showAnswer('Неверный ответ. Error 404. ♡');
      });
    }
  }

  initializePhotoSlots();
  initializeReveal();
  initializeQuestion();
})();
