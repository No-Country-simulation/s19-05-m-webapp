import formatDate from "../../utils/formatDate";
import "./bill.css";

const Bill = ({ order }) => {
    return (
        <div className="container-bill">
            <img src="/logo.png" alt="checkpoint logo" className="bill-logo" />
            <h2 className="bill-title">Factura {order.id_checkout}</h2>
            <div className="bill-detail">
                <p><strong>Fecha de compra:</strong> {formatDate(order.date_checkout)}</p>
                <p><strong>Comprador:</strong> {order.shopping_user}</p>
                <table className="custom-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {
                    order.shopping_products.map((p) => (
                        <tr key={p.products_id}>
                            <td>Producto</td>
                            <td>{p.quantity}</td>
                            <td>${p.price}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
            </div>
            <h2 className="bill-total">Total pagado: ${order.total}</h2>
        </div>
    );
};

export default Bill;
