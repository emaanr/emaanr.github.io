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

window.onpopstate = routing;
window.route = route;
routing();