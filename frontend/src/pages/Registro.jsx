import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Registro from "../components/GoogleAuth/Registro";

const RegisterPage = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div style={{ backgroundColor: "var(--first-color)" }}>
            <Registro />
        </div>
    );
};
  
export default RegisterPage;