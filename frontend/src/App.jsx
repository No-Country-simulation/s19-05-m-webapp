import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;
