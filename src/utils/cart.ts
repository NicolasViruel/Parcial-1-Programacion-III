import { PRODUCTS } from "../data/data";
import type { CartItem, Product } from "../types/product";

const CART_KEY = "storeCart";

export const getCartItems = (): CartItem[] => {
  const rawCart = localStorage.getItem(CART_KEY);
  if (!rawCart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(rawCart) as CartItem[];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (productId: number): void => {
  const currentCart = getCartItems();
  const existingItem = currentCart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    currentCart.push({ productId, quantity: 1 });
  }

  saveCartItems(currentCart);
};

export const updateItemQuantity = (productId: number, quantity: number): void => {
  const currentCart = getCartItems();
  const safeQuantity = Math.max(1, quantity);
  const itemToUpdate = currentCart.find((item) => item.productId === productId);

  if (!itemToUpdate) {
    return;
  }

  itemToUpdate.quantity = safeQuantity;
  saveCartItems(currentCart);
};

export const removeCartItem = (productId: number): void => {
  const filteredCart = getCartItems().filter((item) => item.productId !== productId);
  saveCartItems(filteredCart);
};

export interface CartProductDetail {
  product: Product;
  quantity: number;
  subtotal: number;
}

export const getCartProductDetails = (): CartProductDetail[] => {
  const cartItems = getCartItems();

  return cartItems
    .map((cartItem) => {
      const product = PRODUCTS.find((item) => item.id === cartItem.productId);
      if (!product) {
        return null;
      }

      return {
        product,
        quantity: cartItem.quantity,
        subtotal: product.price * cartItem.quantity,
      };
    })
    .filter((item): item is CartProductDetail => item !== null);
};

export const getCartTotal = (): number => {
  return getCartProductDetails().reduce((acc, item) => acc + item.subtotal, 0);
};
