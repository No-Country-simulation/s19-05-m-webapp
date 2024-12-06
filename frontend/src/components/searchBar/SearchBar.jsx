import "./searchBar.css";

const SearchBar = ({ onSearch, searchTerm }) => {
    const handleSearch = (e) => {
        const value = e.target.value;
        onSearch(value); 
    };

    return (
        <div className="search-bar-container">
            <i className="bx bx-search search-icon"></i>
            <input
                type="text"
                value={searchTerm}  
                onChange={handleSearch}
                placeholder="Buscar pedidos o productos..."
                className="search-table"
            />
        </div>
    );
};

export default SearchBar;
