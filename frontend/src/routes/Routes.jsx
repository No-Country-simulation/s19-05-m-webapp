import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import ProductsPage from "../pages/Products";
import ProductDetailPage from "../pages/ProductDetail";
import { CheckoutPage } from "../pages/Checkout";
import About from "../pages/About/About";
import Politics from "../pages/Politics/Politics";
import Terms from "../pages/Terms/Terms";
import Registro from "../pages/Registro";
import Historial from "../pages/Historial";
import Admin from "../pages/Admin";
import SuccessPage from "../pages/payment/SuccessPage";
import CancelPage from "../pages/payment/CancelPage";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);

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
      {user && user.role === "ADMINISTRATOR" ? (
        <Route path="/admin" element={<Admin />} />
      ) : (
        <Route path="/admin" element={<Navigate to="/" />} />
      )}
      <Route path="/historial" element={<Historial />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  );
};

export default AppRoutes;
