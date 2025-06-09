function ProductList({ products }) {
  if (products.length === 0) {
    return <div>No se encontraron productos</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 m-2 rounded shadow bg-white transform transition duration-300 hover:scale-105"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xs font-medium text-gray-400 mb-1">
                {product.category?.toUpperCase() || "PRODUCTO"}
              </h2>
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                {product.description}
              </p>
              <p className="text-blue-600 font-bold mb-2">${product.price}</p>
              <p className="text-yellow-500 text-sm">
                ⭐ {product.rating || 5}
              </p>
              <a className="text-blue-500 text-sm inline-block mt-2" href="#">
                Ver más →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*<ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.title} - ${p.price}
        </li>
      ))}
    </ul>*/

//}

export default ProductList;
