function StatsPanel({ Total, CantProdTit, PromDisc, max, min, totalPrice }) {
  const stats = [
    { label: "Total de productos", value: Total },
    { label: "Títulos largos", value: CantProdTit },
    { label: "Prom. Descuento (%)", value: PromDisc },
    { label: "Precio Máximo", value: `$${max}` },
    { label: "Precio Mínimo", value: `$${min}` },
    { label: "Suma de precios", value: `$${totalPrice}` },
  ];

  return (
    <section className="bg-blue-50 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Estadísticas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 shadow-md bg-white text-center"
            >
              <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-xl font-semibold text-blue-600">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsPanel;

/*function StatsPanel(props) {
  return (
    <div>
      <h2>Estadisticas</h2>
      <p>Productos totales: {props.Total} productos</p>
      <p>
        Productos con título mayor a 20 caracteres: {props.CantProdTit}{" "}
      </p>{" "}
      <p>Promedio de descuento: {props.PromDisc}%</p>
      <p>Precio máximo: {props.max}</p>
      <p>Precio mínimo: {props.min}</p>
      <p>Precio total de productos filtrados: ${props.totalPrice}</p>
    </div>
  );
}
export default StatsPanel;
*/
