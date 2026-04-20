import type { Icategoria } from "../types/categoria";
import type { Product } from "../types/product";

const CATEGORIES: Icategoria[] = [
  { id: "all", nombre: "Todas" },
  { id: "burgers", nombre: "Hamburguesas" },
  { id: "pizzas", nombre: "Pizzas" },
  { id: "drinks", nombre: "Bebidas" },
  { id: "desserts", nombre: "Postres" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cheese Burger",
    description: "Hamburguesa con cheddar, pepinillos y salsa especial.",
    price: 9500,
    categoryId: "burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Bacon Burger",
    description: "Doble carne con panceta crocante y queso.",
    price: 11900,
    categoryId: "burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Muzzarella",
    description: "Pizza clasica de salsa, muzzarella y oregano.",
    price: 10400,
    categoryId: "pizzas",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Pepperoni",
    description: "Pizza de pepperoni con borde crocante.",
    price: 12800,
    categoryId: "pizzas",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Limonada",
    description: "Limonada natural bien fria. Menta y Jengibre a eleccion",
    price: 3200,
    categoryId: "drinks",
    image:
      "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Brownie",
    description: "Brownie de chocolate con nuez.",
    price: 4200,
    categoryId: "desserts",
    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=900&q=80",
  },
];

export const getCategories = (): Icategoria[] => CATEGORIES;
