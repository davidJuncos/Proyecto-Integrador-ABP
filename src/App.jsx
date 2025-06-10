import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import StatsPanel from "./components/StatsPanel";
import ProductList from "./components/ProductList";

function App() {
  //Estados
  const [products, setProducta] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState("");
  //Ref
  const containerRef = useRef(null);

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
      alert("Seleccioná un formato primero");
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
    } else {
      alert("Formato no soportado");
      return;
    }
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
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
      //seleccion de fomartos de descarga
      <select onChange={(e) => setFormat(e.target.value)} value={format}>
            <option value="">Seleccionas formáto</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
      </select>

      <button onClick={handleExport}
      className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"
      >Exportar archivo</button>

      {/*Usamos componente nuevo*/}
      <ProductList products={filteredProducts} />

      {/*className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"*/}

  {/*className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"  
  
  */}
    <small>Estamos en la página {page}</small>
    <br />
    <button disabled={page ===1} onClick={() => {setPage(page - 1)}}
      style={{ marginTop: '20px' }}
      className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"
      >Anterior</button>
    <button disabled={filteredProducts.length < limit }  onClick={() => {setPage(page + 1)}}
      className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"
      >Siguiente</button>

      <button 
        onClick={() => setShow(!show)}
        className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"
      >
        {show ? "Ocultar" : "Mostrar"}
      </button>

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