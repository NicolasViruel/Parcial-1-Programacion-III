import {
  getCartProductDetails,
  getCartTotal,
  removeCartItem,
  updateItemQuantity,
} from "../../../utils/cart";
import { checkAuhtUser, logout } from "../../../utils/auth";

const cartContainer = document.getElementById("cartContainer") as HTMLDivElement;
const totalContainer = document.getElementById(
  "totalContainer"
) as HTMLDivElement;
const logoutButton = document.getElementById("logoutButton") as HTMLButtonElement;

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
    price
  );

const renderCart = (): void => {
  const details = getCartProductDetails();

  if (details.length === 0) {
    cartContainer.innerHTML = `<p class="empty">Tu carrito esta vacio.</p>`;
    totalContainer.textContent = `Total: ${formatPrice(0)}`;
    return;
  }

  const rows = details
    .map(
      (item) => `
        <tr>
          <td>${item.product.name}</td>
          <td>${formatPrice(item.product.price)}</td>
          <td>
            <input
              class="qty-input"
              type="number"
              min="1"
              value="${item.quantity}"
              data-qty-id="${item.product.id}"
            />
          </td>
          <td>${formatPrice(item.subtotal)}</td>
          <td>
            <button class="btn btn-secondary" data-remove-id="${item.product.id}">
              Quitar
            </button>
          </td>
        </tr>
      `
    )
    .join("");

  cartContainer.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  totalContainer.textContent = `Total: ${formatPrice(getCartTotal())}`;

  const qtyInputs = cartContainer.querySelectorAll(
    "input[data-qty-id]"
  ) as NodeListOf<HTMLInputElement>;
  qtyInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const productId = Number(input.dataset.qtyId);
      const nextQuantity = Number(input.value);
      updateItemQuantity(productId, nextQuantity);
      renderCart();
    });
  });

  const removeButtons = cartContainer.querySelectorAll(
    "button[data-remove-id]"
  ) as NodeListOf<HTMLButtonElement>;
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.removeId);
      removeCartItem(productId);
      renderCart();
    });
  });
};

const initPage = (): void => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );

  logoutButton.addEventListener("click", () => logout());
  renderCart();
};

initPage();
