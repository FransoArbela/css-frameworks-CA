const themeToggler = document.querySelectorAll("#theme-toggler");
const burgerBtn = document.querySelector("#burger-btn");
const mobileMenu = document.querySelector("#mobile-menu-wrapper");
const showBtn = document.getElementById("show-post-form-btn");
const form = document.getElementById("new-post-form");

// let menuOpen = false;

function toggleMenu() {
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
  form.classList.toggle("hidden");
  if (!form.classList.contains("hidden")) {
    form.scrollIntoView({ behavior: "smooth" });
  }
}

// Event listeners
burgerBtn.addEventListener("click", toggleMenu);

themeToggler.forEach((toggler) => {
  toggler.addEventListener("click", () => toggleTheme(toggler));
});

showBtn.addEventListener("click", togglePostForm);
