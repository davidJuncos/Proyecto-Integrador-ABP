<<<<<<< HEAD
# 📦 Catálogo de Productos

Este proyecto muestra un catálogo de productos con una interfaz visual moderna y estadísticas clave del inventario.

---

## 📊 Estadísticas Agregadas

En este proyecto se integraron estadísticas clave para entender mejor los productos disponibles en el catálogo:

1. Agregar estadísticas adicionales
   Incorporar estadísticas nuevas a la sección de estadísticas:

- **Cantidad de Títulos largos:** La cantidad de productos cuyo título contiene más de 20 caracteres.
- **Promedio de descuento (%):** El promedio de descuento ( discountPercentage ) de los productos filtrados.
  Proponer otras estadísticas, siempre que se basen en los productos filtrados y se
  calculen dinámicamente.

Estas Valores se calculan en el componente principal y luego se pasan como `props` al componente `StatsPanel` para su presentación.

---

## División del Código en Componentes

El código se dividió en componentes reutilizables para mantener la claridad, escalabilidad y separación de responsabilidades. Los principales componentes son:

### StatsPanel

Este componente se encarga de mostrar las estadísticas generales del catálogo. Recibe como propiedades los valores previamente calculados y los presenta en una cuadrícula visualmente atractiva.

**Responsabilidades:**

- Mostrar métricas clave como cantidad total, precios extremos, y promedio de descuento.
- Presentación clara con estilo visual limpio, adaptable a diferentes tamaños de pantalla.

```jsx
<StatsPanel
  Total={...}
  CantProdTit={...}
  PromDisc={...}
  max={...}
  min={...}
  totalPrice={...}
/>
```

---

### ProductList

Este componente muestra la lista de productos en forma de tarjetas. Cada tarjeta incluye información como imagen, categoría, título, descripción, precio y rating del producto.

**Responsabilidades:**

- Renderizar dinámicamente todos los productos recibidos como `props`.
- Mostrar una cuadrícula responsiva con diseño atractivo y animaciones sutiles al pasar el cursor.
- Proveer retroalimentación en caso de que no se encuentren productos (`"No se encontraron productos"`).

```jsx
<ProductList products={productosFiltrados} />
```

Cada producto se representa como una tarjeta individual con su miniatura, título, descripción corta, precio y calificación visual.
=======
# Proyecto-Integrador-ABP
>>>>>>> 1c610863219012e7b79b1a9a76f80093de030238
