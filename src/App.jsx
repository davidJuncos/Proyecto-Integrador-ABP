import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import StatsPanel from "./components/StatsPanel";
import ProductList from "./components/ProductList";
import * as XLSX from "xlsx"; // Asegurate de importar esto arriba en tu archivo

function App() {
  //Estados
  const [products, setProducta] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  //Ref
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const obsRef = useRef();
  const containerRef = useRef(null);
  
  //Funcion para mostra mensajes temporales
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  
  const limit = 30;

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page -1)* limit}`).then((res) => {
      setProducta(res.data.products);
    });
  }, [page]);
  const [darkMode, setDarkMode] = useState(false);

  {
    /*Filtarmos productos */
  }
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
  const minProduct = Math.min(...filteredProducts.map((p) => p.price));
  const productsLongTit = filteredProducts.filter((p) => p.title.length > 20);
  const countLongProduct = productsLongTit.length;
  const totalPrice = filteredProducts.reduce((pf, p) => pf + p.price, 0);
  const PromDisc =
    filteredProducts.length > 0
      ? filteredProducts.reduce((acc, p) => acc + p.discountPercentage, 0) /
        filteredProducts.length
      : 0;

  /*const [show, setShow] = useState(true);*/

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
    //currentRef.current.classList.toggle("dark-mode"));
  };

  const handleExport = () => {
    if (!format) {
      showMessage("Seleccioná un formato primero", "error");
      return;
    }
  
    let blob;
    let filename;
  
    if (format === "json") {
      blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
        type: "application/json",
      });
      filename = "productos.json";
    } else if (format === "csv") {
      const csvHeader = Object.keys(filteredProducts[0]).join(",") + "\n";
      const csvRows = filteredProducts
        .map(product =>
          Object.values(product)
            .map(value => `"${String(value).replace(/"/g, '""')}"`) // escapa comillas
            .join(",")
        )
        .join("\n");
  
      const csvContent = csvHeader + csvRows;
      blob = new Blob([csvContent], { type: "text/csv" });
      filename = "productos.csv";
    } else if (format === "Excel") {
      const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
  
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      blob = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      filename = "productos.xlsx";
    } else {
      showMessage("Formato no soportado");
      return;
    }
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
    showMessage("Archivo exportado con éxito", "success");
  };

  const triggerDownload = (url, filename) => {
    //crea el hipervinculo
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    //agregamos el anchor en el DOM
    document.body.appendChild(link);
    //simulamos el click del elemento
    link.click();
    //eliminar el elmento anchor
    document.body.removeChild(link);
  };

  return (
    <div ref={containerRef}>
      <h1 className="text-3xl text-blue-600 font-bold text-center my-4">
        Catálogo de Productos
      </h1>
      
      {message && (
        <div
          className={`p-2 text-center mb-4 rounded ${
            messageType === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
        )}


      <button
        onClick={toggleDarkMode}
        className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"
      >
        Modo {darkMode ? "Claro" : "Oscuro"}
      </button>
     
      <input
        type="text"
        placeholder="Buscar Producto"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="border border-gray-300 rounded p-2 w-full max-w-md mx-auto block mb-6"
      />
      
      {/* //seleccion de fomartos de descarga
      <select onChange={(e) => setFormat(e.target.value)} value={format}>
            <option value="">Seleccionas formáto</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="Excel">Excel</option>
      </select>*/}
      {/*
      <p className="mb-1">Selección de formatos de descarga</p>
      
      <div className="flex gap-4 mb-4">
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
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
        >
          Exportar archivo
        </button>
      </div>
      */}

      {/* Contenedor principal que centra vertical y horizontalmente el texto y los controles */}
      <div className="flex flex-col items-center mb-4">
        
        {/* Texto informativo centrado que indica la función del selector */}
        <p className="mb-1 text-center">Selección de formatos de descarga</p>
        
        {/* Contenedor horizontal para el selector y el botón con separación entre ellos */}
        <div className="flex gap-4">
          
          {/* Selector para elegir el formato de exportación */}
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

          {/* Botón para disparar la función de exportación */}
          <button
            onClick={handleExport}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
          >
            Exportar archivo
          </button>
          
        </div>
      </div>


      {/*Usamos componente nuevo*/}
      <ProductList products={filteredProducts} />
      {/* Contenedor con borde negro para los botones y el texto de la página */}
      <div className="flex flex-col items-center gap-4 p-4 mb-4 rounded-xl shadow-lg bg-white border border-black">

  
        {/* Texto informativo sobre la página actual */}
        <small className="text-black ">Estamos en la página {page}</small>

        {/* Contenedor horizontal para los botones con separación y centrado */}
        <div className="flex flex-wrap justify-center gap-4">
          
          {/* Botón para ir a la página anterior. Se desactiva si ya estamos en la primera página */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-32 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow"
          >
            Anterior
          </button>

          {/* Botón para ir a la página siguiente. Se desactiva si no hay más productos */}
          <button
            disabled={filteredProducts.length < limit}
            onClick={() => setPage(page + 1)}
            className="w-32 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow"
          >
            Siguiente
          </button>

          {/* Botón para mostrar/ocultar estadísticas del panel */}
          <button
            onClick={() => setShow(!show)}
            className="w-32 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow"
          >
            {show ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>
      {show && (
        <StatsPanel
          Total={totalProducts}
          CantProdTit={countLongProduct}
          PromDisc={PromDisc.toFixed(2)}
          max={maxProduct}
          min={minProduct}
          totalPrice={totalPrice.toFixed(2)}
        />
      )}
    </div>
  );
}

export default App;