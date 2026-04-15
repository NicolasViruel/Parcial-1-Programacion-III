import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart } from "../../../utils/cart";
import { checkAuhtUser, logout } from "../../../utils/auth";

const productsContainer = document.getElementById(
  "productsContainer"
) as HTMLDivElement;
const categoriesContainer = document.getElementById(
  "categoriesContainer"
) as HTMLDivElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const emptyState = document.getElementById("emptyState") as HTMLDivElement;
const feedback = document.getElementById("feedback") as HTMLParagraphElement;
const logoutButton = document.getElementById("logoutButton") as HTMLButtonElement;

let selectedCategory = "all";
let searchTerm = "";

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
    price
  );

const showFeedback = (message: string): void => {
  feedback.textContent = message;
  setTimeout(() => {
    if (feedback.textContent === message) {
      feedback.textContent = "";
    }
  }, 1200);
};

const getFilteredProducts = () => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });
};

const renderProducts = (): void => {
  const products = getFilteredProducts();
  productsContainer.innerHTML = "";

  emptyState.style.display = products.length === 0 ? "block" : "none";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-description">${product.description}</p>
        <div class="card-footer">
          <strong>${formatPrice(product.price)}</strong>
          <button class="btn-primary" data-product-id="${product.id}">Agregar</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(card);
  });

  const addButtons = productsContainer.querySelectorAll(
    "button[data-product-id]"
  ) as NodeListOf<HTMLButtonElement>;

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);
      addToCart(productId);
      showFeedback("Producto agregado al carrito");
    });
  });
};

const renderCategories = (): void => {
  const categories = getCategories();
  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category.nombre;
    button.className = `category-btn ${
      selectedCategory === category.id ? "active" : ""
    }`;

    button.addEventListener("click", () => {
      selectedCategory = category.id;
      renderCategories();
      renderProducts();
    });

    categoriesContainer.appendChild(button);
  });
};

const initPage = (): void => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );

  logoutButton.addEventListener("click", () => logout());

  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value;
    renderProducts();
  });

  renderCategories();
  renderProducts();
};

initPage();
