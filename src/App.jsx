import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import StatsPanel from "./components/StatsPanel";
import ProductList from "./components/ProductList";
import * as XLSX from "xlsx"; // Asegurate de importar esto arriba en tu archivo
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import ExportControls from "./components/ExportControls";
import PaginationControls from "./components/PaginationControls";


function App() {
  //Estados
  const [products, setProducta] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState("");
  

  //Ref
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

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

      <Header/>
    
      {message && (
        <div
          className={`p-2 text-center mb-4 rounded ${
            messageType === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
        )}

    
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <SearchBar search={search} setSearch={setSearch} />
      
      <ExportControls
          format={format}
          setFormat={setFormat}
          handleExport={handleExport}
        />
      
     

      {/*Usamos componente nuevo*/}
      <ProductList products={filteredProducts} />
      
      <PaginationControls
        page={page}
        setPage={setPage}
        filteredProducts={filteredProducts}
        limit={limit}
        show={show}
        setShow={setShow}
      />

    
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