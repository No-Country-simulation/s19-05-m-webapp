import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/Products";
import ProductDetailPage from "../pages/ProductDetail";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
    );
};

export default AppRoutes;
