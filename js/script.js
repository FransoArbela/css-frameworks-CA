import { posts } from "./posts.js";

const themeToggler = document.querySelectorAll(".theme-toggler");
const burgerBtn = document.querySelector("#burger-btn");
const mobileMenu = document.querySelector("#mobile-menu-wrapper");
const showBtn = document.getElementById("show-post-form-btn");
const form = document.getElementById("new-post-form");
const postsContainer = document.getElementById("posts-container");

let menuOpen = false;

function toggleMenu() {
  if (!mobileMenu || !burgerBtn) return;

  mobileMenu.classList.toggle("hidden");
  menuOpen = !menuOpen;
  burgerBtn.innerHTML = menuOpen
    ? `<i class="fa-solid fa-xmark fa-2xl" style="color: #ffffff;"></i>`
    : `<i class="fa-solid fa-bars fa-xl"></i>`;
}

document.documentElement.classList.add(
  localStorage.getItem("theme") === "dark" ? "dark" : "light"
);

function toggleTheme(toggler) {
  document.documentElement.classList.toggle("dark");
  toggler.innerHTML = document.documentElement.classList.contains("dark")
    ? `<i class="fa-solid fa-sun fa-xl"  style="color: #FFD43B;"></i>`
    : `<i class="fa-solid fa-moon fa-xl"  style="color: #525252;"></i>`;
  localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
}

function togglePostForm() {
  if (!form) return;

  form.classList.toggle("hidden");
  if (!form.classList.contains("hidden")) {
    form.scrollIntoView({ behavior: "smooth" });
  }
}

function renderFeedPosts() {
  if (!postsContainer) return;

  postsContainer.innerHTML = posts
    .map(
      (post) => `
      <article class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-xl mx-auto">
        <header class="flex items-center px-4 py-3">
          <img
            src="${post.avatar}"
            alt="${post.username} avatar"
            class="w-10 h-10 rounded-full mr-3"
          />
          <span class="font-semibold text-gray-800 dark:text-gray-200">${post.username}</span>
        </header>
        <img
          src="${post.image}"
          alt="Post image by ${post.username}"
          class="w-full h-72 object-cover"
        />
        <div class="px-4 py-3">
          <p class="text-gray-700 dark:text-gray-300 mb-2">${post.content}</p>
          <div class="mt-4">
            <span class="font-semibold text-gray-800 dark:text-gray-200">Comments</span>
            <ul class="mt-2 space-y-1">
              ${post.comments
                .map(
                  (comment) => `
                <li>
                  <span class="font-semibold">${comment.user}:</span>
                  <span>${comment.text}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// Event listeners
if (burgerBtn) {
  burgerBtn.addEventListener("click", toggleMenu);
}

themeToggler.forEach((toggler) => {
  toggler.addEventListener("click", () => toggleTheme(toggler));
});

if (showBtn) {
  showBtn.addEventListener("click", togglePostForm);
}

renderFeedPosts();
