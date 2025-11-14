function openTimeline(button) {
  button.classList.add('open');
  const description = button.parentElement.querySelector('.home-timeline-item_content_description');
  description.style.display = 'block';
}

function initWarble() {
  const targets = document.querySelectorAll('.warble-target');

  targets.forEach(target => {
    const text = target.textContent;
    warble(target, text, 1);

    target.addEventListener('mouseenter', () => {
      warble(target, text);
    });
  });
}

function warble(element, text, delay = 0, duration = 2000, speed = 40) {
  if (element.dataset.warbling === 'true') return;

  const chars = '01|/\\-_~`*#@$%^&+=<>[]{}();:.,?!';

  setTimeout(() => {
    element.dataset.warbling = 'true';
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (progress >= i / text.length) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = result;

      if (progress === 1) {
        clearInterval(interval);
        element.textContent = text;
        element.dataset.warbling = 'false';
      }
    }, speed);
  }, delay * 1000);
}