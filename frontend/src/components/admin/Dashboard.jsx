import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <h1>Dashboard Administrador</h1>
            <button onClick={openModal}>Crear producto</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Mostrar form!</h2>
            </Modal>
        </>
    );
};
  
export default Dashboard;
