import AppRoutes from "./routes/Routes";
import "./App.css";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;
