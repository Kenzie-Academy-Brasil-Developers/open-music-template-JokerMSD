// theme.js
const body = document.body;
const darkModeButton = document.querySelector(".header__dark-mode-button");
const logoImage = document.querySelector(".header__img-logo");
const header = document.querySelector(".header__logo");
const albumTitle = document.querySelector(".album-section__title");

const adjustElements = () => {
  const elementsToAdjust = [
    body,
    albumTitle,
    header,
    darkModeButton,
    ...document.querySelectorAll(".band"),
    ...document.querySelectorAll(".bandtitle"),
    ...document.querySelectorAll(".price"),
    ...document.querySelectorAll(".buybutton"),
    ...document.querySelectorAll(".divband"),
    ...document.querySelectorAll(".genre_button"),
  ];

  elementsToAdjust.forEach((element) => {
    element.classList.toggle(
      "light-mode",
      body.classList.contains("light-mode")
    );
    element.classList.toggle("dark-mode", body.classList.contains("dark-mode"));
  });

  logoImage.src = body.classList.contains("dark-mode")
    ? "./src/assets/img/day.png"
    : "./src/assets/img/night.png";
};

const enableDarkMode = () => {
  body.classList.add("dark-mode");
  body.classList.remove("light-mode");
  adjustElements();
  logoImage.src = "./src/assets/img/day.png";
  localStorage.setItem("darkMode", true);
};

const enableLightMode = () => {
  body.classList.add("light-mode");
  body.classList.remove("dark-mode");
  adjustElements();
  logoImage.src = "./src/assets/img/night.png";
  localStorage.setItem("darkMode", false);
};

const toggleTheme = () => {
  if (body.classList.contains("dark-mode")) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

// Carregar o tema salvo do LocalStorage ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme === "false") {
    enableLightMode();
  } else {
    enableDarkMode();
  }
  adjustElements();
});

darkModeButton.addEventListener("click", toggleTheme);

export default toggleTheme;
