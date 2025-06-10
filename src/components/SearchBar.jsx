const SearchBar = ({ search, setSearch }) => (
    <input
      type="text"
      placeholder="Buscar Producto"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 rounded p-2 w-full max-w-md mx-auto block mb-6"
    />
  );
  
  export default SearchBar;
  