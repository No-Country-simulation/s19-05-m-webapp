import "./Historial.css";
import useFetch from "../../hooks/useFetch";
import checkoutService from "../../services/checkouts";

const Historial = () => {
    const { data: checkout } = useFetch(checkoutService.getCheckouts);

    return (
        <div id="table-container">
            <table id="tabla-historial">
                <thead>
                    <tr>
                        <th>ID Compra</th>
                        <th>Fecha de compra</th>
                        <th>Estado de compra</th>
                        <th>Total</th>
                        <th>Factura</th>
                    </tr>
                </thead>
                <tbody>
                {checkout &&
                checkout.map((checkout) => (
                        <tr>
                            <td>{checkout.id_checkout}</td>
                            <td>{checkout.date_checkout}</td>
                            <td>{checkout.status}</td>
                            <td>${checkout.total}</td>
                            <td><button className="boton-factura">Ver Factura</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historial;