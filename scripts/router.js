export const routes = {
  "/": "pages/home.html",
  "/makerspace": "pages/makerspace.html",
  "/experience": "pages/experience.html",
  "/blog": "pages/blog.html",
  "/notes": "pages/notes"
};

export async function router() {
  const path = location.hash.slice(1) || "/";
  const page = routes[path] || routes["/"];
  const app = document.getElementById("app");
  if (!app) return;

  const result = await fetch(page);
  app.innerHTML = await result.text();
}