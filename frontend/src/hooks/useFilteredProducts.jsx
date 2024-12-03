import { useEffect, useState } from "react";

const useFilteredProducts = (
  selectedOptions,
  products,
  productsByGenre,
  productsByPlatform,
  page
) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let productsToShow = products;

    if (selectedOptions.genre && productsByGenre) {
      selectedOptions.platform
        ? (productsToShow = productsByGenre.filter((product) =>
            product.platforms.some(
              (platform) => platform.name === selectedOptions.platform
            )
          ))
        : (productsToShow = productsByGenre);
    }

    if (selectedOptions.platform && productsByPlatform) {
      selectedOptions.genre
        ? (productsToShow = productsByPlatform.filter(
            (product) => product.genre === selectedOptions.genre
          ))
        : (productsToShow = productsByPlatform);
    }

    if (selectedOptions.model && productsToShow) {
      productsToShow = productsToShow.filter((product) =>
        product.platforms.some(
          (platform) => platform.model === selectedOptions.model
        )
      );
    }

    setFilteredProducts(productsToShow?.slice(0, page * 10));
  }, [selectedOptions, products, productsByGenre, productsByPlatform, page]);

  return filteredProducts;
};

export default useFilteredProducts;
