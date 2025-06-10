  const ExportControls = ({ format, setFormat, handleExport, noProductsAvailable }) => (
    <div className="flex flex-col items-center mb-4">
      <p className="mb-1 text-center">Selección de formatos de descarga</p>
      {noProductsAvailable ? (
        <p className="text-red-500">No hay productos para exportar.</p>
      ) : (
        <div className="flex gap-4">
          <select
            onChange={(e) => setFormat(e.target.value)}
            value={format}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Seleccionas formato</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="Excel">Excel</option>
          </select>
          <button
            onClick={handleExport}
            disabled={noProductsAvailable}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Exportar archivo
          </button>
        </div>
      )}
    </div>
  );
  
  export default ExportControls;
  
  