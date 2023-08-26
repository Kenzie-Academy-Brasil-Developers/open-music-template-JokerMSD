/* Desenvolva sua lógica aqui ... */

const createCard = (product, mode) => {
  const card = document.createElement("li");
  card.classList.add("card");
  card.classList.add(mode);

  const image = document.createElement("img");
  image.classList.add("img-card");
  image.src = product.img;
  image.alt = product.title;
  card.appendChild(image);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("divband");
  infoContainer.classList.add(mode);

  const bandAndYear = document.createElement("p");
  bandAndYear.classList.add("band");
  bandAndYear.classList.add(mode);

  bandAndYear.textContent = `${product.band} - ${product.year}`;

  const title = document.createElement("h2");
  title.classList.add("bandtitle");
  title.classList.add(mode);
  title.textContent = product.title;

  const priceAndButton = document.createElement("span");
  priceAndButton.classList.add("priceAndButton");
  priceAndButton.classList.add(mode);

  const price = document.createElement("p");
  price.classList.add("price");
  price.classList.add(mode);
  price.textContent = `R$ ${product.price.toFixed(2)}`;

  const buyButton = document.createElement("button");
  buyButton.classList.add("buybutton");
  buyButton.classList.add(mode);
  buyButton.textContent = "Comprar";

  priceAndButton.appendChild(price);
  priceAndButton.appendChild(buyButton);

  infoContainer.appendChild(priceAndButton);
  infoContainer.appendChild(title);
  infoContainer.appendChild(bandAndYear);

  card.appendChild(infoContainer);

  return card;
};

const renderCards = (products, mode) => {
  const cardContainer = document.querySelector(".album-section__album-cards");

  products.forEach((product) => {
    const card = createCard(product, mode);
    cardContainer.appendChild(card);
  });
};

renderCards(products);

const renderFilterButtons = (categories) => {
  const buttonContainer = document.querySelector(".filter-section__genre-list");

  categories.forEach((category) => {
    const listItem = document.createElement("li");

    const button = document.createElement("button");
    button.classList.add("genre_button");
    button.classList.add("active");
    button.classList.add("light-mode");

    button.textContent = category;

    listItem.appendChild(button);
    buttonContainer.appendChild(listItem);
  });
};

renderFilterButtons(categories);

import toggleTheme from "./theme.js";

const toggleButton = document.querySelector(".header__dark-mode-button");

toggleButton.addEventListener("click", toggleTheme);

const priceRangeInput = document.querySelector(".filter-section__price-range");
const priceText = document.querySelector(".filter-section__price-text");
const ul = document.querySelector(".album-section__album-cards");

const formatPrice = (value) => {
  const intValue = Math.floor(value);
  const decimalPart = (value - intValue).toFixed(2).slice(2);
  const formattedValue = `${
    intValue < 10 ? "0" : ""
  }${intValue}.${decimalPart}`;
  return formattedValue;
};

const updatePriceText = () => {
  const priceRangeInputValue = parseFloat(priceRangeInput.value);
  const priceRangeInputFixed = formatPrice(priceRangeInputValue);
  const priceTextFixed = priceText;
  priceTextFixed.textContent = `Até R$: ${priceRangeInputFixed}`;
};
const body = document.querySelector(".body");

const clearCardContainer = () => {
  const cardContainer = document.querySelector(".album-section__album-cards");
  cardContainer.innerHTML = "";
};

function applyFilters(price, genre) {
  clearCardContainer();

  const filteredByPrice =
    price > 0 ? products.filter((product) => product.price <= price) : products;

  const filteredProducts =
    genre === "Todos"
      ? filteredByPrice
      : filteredByPrice.filter(
          (product) => product.category === categories.indexOf(genre)
        );

  renderCards(
    filteredProducts,
    body.classList.contains("dark-mode") ? "dark-mode" : "light-mode"
  );
}

priceRangeInput.addEventListener("input", (e) => {
  e.preventDefault();
  updatePriceText();

  const priceRangeInputValue = parseFloat(priceRangeInput.value);
  const selectedGenre = document.querySelector(
    ".genre_button.active"
  )?.textContent;

  applyFilters(priceRangeInputValue, selectedGenre);
});

const genreButtons = document.querySelectorAll(".genre_button");

genreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    genreButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedGenre = button.textContent;
    const priceRangeInputValue = parseFloat(priceRangeInput.value);
    applyFilters(priceRangeInputValue, selectedGenre);
  });
});


updatePriceText();
toggleTheme();
