import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import InfiniteScroll from "../infiniteScroll/InfiniteScroll";
import Loader from "../loader/Loader";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import useReset from "../../hooks/useReset";
import usePagination from "../../hooks/usePagination";
import options from "../../utils/options";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import "./products.css";

const Products = () => {
  const {
    data: products,
    loading: productsLoading,
    hasError: productsError,
    setHasError: setProductsError,
  } = useFetch(productService.getProducts);
  const {
    page,
    loading: paginationLoading,
    loadMore,
    resetPagination,
  } = usePagination();
  
  const navigate = useNavigate();
  const location = useLocation();
  const [modelOptions, setModelOptions] = useState([]);

  const {
    values: selectedOptions,
    handleChange,
    reset,
  } = useReset({ 
    platform: "Seleccionar Plataforma", genre: "Seleccionar Género", model: "Seleccionar Modelo" });

  const {
    data: productsByGenre,
    loading: genreLoading,
    hasError: genreError,
    setHasError: setGenreError,
  } = useFetch(
    selectedOptions.genre !== "Seleccionar Género" ? productService.getProductsByGenre : null,
    selectedOptions.genre
  );

  const {
    data: productsByPlatform,
    loading: platformLoading,
    hasError: platformError,
    setHasError: setPlatformError,
  } = useFetch(
    selectedOptions.platform !== "Seleccionar Plataforma" ? productService.getProductsByPlatform : null,
    selectedOptions.platform
  );

  let filteredProducts = useFilteredProducts(
    selectedOptions,
    products,
    productsByGenre,
    productsByPlatform,
    page
  );

  useEffect(() => {
    if (selectedOptions.platform) {
      const newModelOptions = options.modelOptionsByPlatform[selectedOptions.platform] || [];
      setModelOptions(newModelOptions);
  
      if (!newModelOptions.some(option => option.value === selectedOptions.model)) {
        handleChange({ target: { name: 'model', value: 'Seleccionar Modelo' } });
      }
    } else {
      setModelOptions([]);
    }
  }, [selectedOptions.platform, selectedOptions.model]);
  
  const handleCard = (id) => {
    navigate(`/product/${id}`);
  };

  const isFilterActive = 
    selectedOptions.platform !== "Seleccionar Plataforma" || 
    selectedOptions.genre !== "Seleccionar Género";

  const handleResetFilters = () => {
    reset();
    resetPagination();
    setProductsError(null);
    setGenreError(null);
    setPlatformError(null);
  };

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  filteredProducts = filteredProducts?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className="products-dropdown">
        <Dropdown
          options={options.platformOptions}
          value={selectedOptions.platform}
          onChange={handleChange}
          name="platform"
          disabled={!!productsError || !!genreError || !!platformError}
        />
        <Dropdown
          options={options.genreOptions}
          value={selectedOptions.genre}
          onChange={handleChange}
          name="genre"
          disabled={!!productsError || !!genreError || !!platformError}
        />
        {selectedOptions.platform !== "Seleccionar Plataforma" && productsByPlatform && (
          <Dropdown
            options={modelOptions}
            value={selectedOptions.model}
            onChange={handleChange}
            name="model"
            disabled={!!productsError || !!genreError || !!platformError}
          />
        )}
        {isFilterActive && (
          <button className="clear-filters-btn" onClick={handleResetFilters}>
            Borrar filtros
          </button>
        )}
      </div>
      <h1 className="products-title">Productos</h1>
      <div className="products-container">
        {productsError || genreError || platformError ? (
          <p>{productsError || genreError || platformError}</p>
        ) : productsLoading || genreLoading || platformLoading ? (
          <Loader />
        ) : filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.reverse().map((product) => (
            product.stock > 0 && (
              <Card
                key={product.id_product}
                title={product.title}
                image={product.image}
                genre={product.genre}
                price={product.price}
                onClick={() => handleCard(product.id_product)}
              />
            )
          ))
        ) : isFilterActive && filteredProducts?.length === 0 ? (
          <p>
            No se encontraron productos que coincidan con los filtros
            seleccionados.
          </p>
        ) : null}
      </div>
      <InfiniteScroll
        onLoadMore={loadMore}
        hasMore={filteredProducts?.length < products?.length}
        loading={paginationLoading}
      />
      {paginationLoading && <Loader />}
    </>
  );
};

export default Products;
