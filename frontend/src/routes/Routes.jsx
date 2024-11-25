import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ProductsPage from "../pages/Products";
import ProductDetailPage from "../pages/ProductDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
