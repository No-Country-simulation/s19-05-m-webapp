import { useSearchParams } from "react-router-dom";

const CancelPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="page-container">
      <h1>Pago cancelado</h1>
      <p>
        <strong>ID del pedido:</strong> {orderId || "No disponible"}
      </p>
    </div>
  );
};

export default CancelPage;
