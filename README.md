# Parcial 1 - Programacion III - Food Store

## Descripcion breve

Este proyecto corresponde al **Primer Parcial de Programacion III** y fue desarrollado sobre el repositorio base provisto por la catedra (`Vite + TypeScript`).

La aplicacion implementa un flujo frontend para una tienda de comida (`Food Store`) con:

- proteccion basica de rutas por rol (`admin` y `client`),
- catalogo de productos renderizado dinamicamente,
- busqueda por nombre,
- filtrado por categoria,
- carrito con persistencia en `localStorage`,
- vista de carrito con cantidades y total acumulado.

> Importante: la autenticacion y la proteccion de rutas estan simuladas en frontend con `localStorage`, por lo que es una solucion educativa y no de produccion.

## Funcionalidades implementadas

### 1) Catalogo de productos

- Renderizado dinamico desde `src/data/data.ts`.
- Visualizacion de nombre, descripcion, precio e imagen por producto.

### 2) Busqueda y filtrado

- Busqueda de productos por nombre (coincidencia parcial).
- Filtro por categoria desde un menu lateral.
- Mensaje visual cuando no hay coincidencias.

### 3) Carrito con persistencia

- Agregado de productos desde el catalogo.
- Persistencia en `localStorage` (key: `storeCart`).
- Si un producto ya existe en carrito, aumenta cantidad en lugar de duplicarlo.

### 4) Vista de carrito y total

- Visualizacion de nombre, precio, cantidad y subtotal por item.
- Edicion de cantidades y eliminacion de productos.
- Calculo del total general del carrito en tiempo real.

### 5) Proteccion de rutas

- Control de acceso por rol usando `checkAuhtUser` y verificacion temprana en HTML.
- Redireccion a login si no existe sesion.
- Redireccion por rol cuando se intenta acceder a una ruta no permitida.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- TypeScript
- Vite

## Instalacion y ejecucion

### 1. Clonar repositorio

```bash
git clone <URL_DE_TU_REPO>
cd proteger_rutas
```

### 2. Instalar pnpm (si no esta instalado)

```bash
npm install -g pnpm
```

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Ejecutar entorno de desarrollo

```bash
pnpm dev
```

La app quedara disponible en la URL que muestre la terminal (generalmente `http://localhost:5173`).

### 5. Build de produccion (opcional)

```bash
pnpm build
```

## Estructura principal del proyecto

```text
src/
├── data/
│   └── data.ts
├── pages/
│   ├── admin/
│   │   └── home/
│   ├── auth/
│   │   ├── login/
│   │   └── registro/
│   ├── client/
│   │   └── home/
│   └── store/
│       ├── home/
│       └── cart/
├── types/
│   ├── IUser.ts
│   ├── Rol.ts
│   ├── categoria.ts
│   └── product.ts
└── utils/
    ├── auth.ts
    ├── cart.ts
    ├── localStorage.ts
    └── navigate.ts
```
