import "./bill.css";

const Bill = ({ product }) => {
    return (
        <div className="container-bill">
            <img src="/logo.png" alt="checkpoint logo" className="bill-logo" />
            <h2 className="bill-title">Factura #254861</h2>
            <div className="bill-detail">
                <p><strong>Fecha de compra:</strong> 30/11/2024</p>
                <p><strong>Comprador:</strong> {product?.name}</p>
                <p><strong>Productos:</strong></p>
                <ul className="bill-list">
                    <li>Producto 1 - $1</li>
                    <li>Producto 2 - $54</li>
                    <li>Producto 3 - $30</li>
                    <li>Producto 4 - $20</li>
                </ul>
            </div>
            <h2 className="bill-total">Total pagado: $105</h2>
        </div>
    );
};

export default Bill;
