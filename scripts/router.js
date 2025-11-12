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

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  routing();
};

const routes = {
  404: "404.html",
  "/": "/pages/home.html",
  "/projects": "/pages/projects.html",
  "/experience": "/pages/experience.html",
  "/blog": "/pages/blog.html",
  "/notes": "/pages/notes.html"
};

const routing = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.querySelector("main").innerHTML = html;

  initWarble(); // Initialize warble after content loads
};

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

window.onpopstate = routing;
window.route = route;
routing();