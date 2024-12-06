import Historial from "../components/Historial/Historial";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HistorialPage = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div style={{ backgroundColor: "var(--first-color)" }}>
            <Historial />
        </div>
    );
};
  
export default HistorialPage;
  