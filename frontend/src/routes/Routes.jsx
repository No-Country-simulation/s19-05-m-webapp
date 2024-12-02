import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ProductsPage from "../pages/Products";
import ProductDetailPage from "../pages/ProductDetail";
import { CheckoutPage } from "../pages/Checkout";
import About from "../pages/About/About";
import Politics from "../pages/Politics/Politics";
import Terms from "../pages/Terms/Terms";
import Registro from "../components/GoogleAuth/Registro";
import Admin from "../pages/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/politics" element={<Politics />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;
