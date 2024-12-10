import "./Historial.css";
import useFetch from "../../hooks/useFetch";
import checkoutService from "../../services/checkouts";
import { useSelector } from "react-redux";

const Historial = () => {
    const user = useSelector((state) => state.auth.user);
    const { data: checkout } = useFetch(checkoutService.getCheckoutUser, user.id_users);
    console.log(user.id_users)

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
                        <tr key={checkout.id_checkout}>
                            <td>{checkout.id_checkout}</td>
                            <td>{new Date(checkout.date_checkout).toLocaleDateString()}</td>
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