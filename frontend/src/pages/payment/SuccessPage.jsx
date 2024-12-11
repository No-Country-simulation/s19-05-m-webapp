import { useSearchParams } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="page-container">
      <h1>¡Pago completado con éxito!</h1>
      <p>
        <strong>ID del pedido:</strong> {orderId}
      </p>
    </div>
  );
};

export default SuccessPage;
