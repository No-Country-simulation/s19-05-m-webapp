import "./Historial.css";
import useFetch from "../../hooks/useFetch";
import productService from "../../services/products";

const Historial = () => {
    const { data: products } = useFetch(productService.getProducts);

    return (
        <>
        <table id="tabla-historial">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha de compra</th>
                    <th>Estado de compra</th>
                    <th>Total</th>
                    <th>Factura</th>
                </tr>
            </thead>
            <tbody>
            {products &&
            products.map((product) => (
                    <tr>
                        <td>{product.title}</td>
                        <td>{product.category}</td>
                        <td>Estado</td>
                        <td>${product.price}</td>
                        <td><button>Ver Factura</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
};

export default Historial;