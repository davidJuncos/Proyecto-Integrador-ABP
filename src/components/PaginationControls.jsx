const PaginationControls = ({ page, setPage, filteredProducts, limit, show, setShow }) => (
    <div className="flex flex-col items-center gap-4 p-4 mb-4 rounded-xl shadow-lg bg-white border border-black">
      <small className="text-black">Estamos en la página {page}</small>
      <div className="flex flex-wrap justify-center gap-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="w-32 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow">Anterior</button>
        <button disabled={filteredProducts.length < limit} onClick={() => setPage(page + 1)} className="w-32 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow">Siguiente</button>
        <button onClick={() => setShow(!show)} className="w-32 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow">{show ? "Ocultar" : "Mostrar"}</button>
      </div>
    </div>
  );
  
  export default PaginationControls;
  