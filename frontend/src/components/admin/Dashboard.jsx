import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";
import Form from "../form/Form";
import productFields  from "../../utils/productFields";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    const handleSubmit = (formValues) => {
        console.log("Producto creado:", formValues);
        closeModal(); 
    };

    return (
        <>
            <h1>Dashboard Administrador</h1>
            <button onClick={openModal}>Crear producto</button>
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                title="Crear producto">
                <Form
                    fields={productFields.fields} 
                    onSubmit={handleSubmit}
                    initialValues={productFields.initialValues}
                    buttonText="Crear"
                />
            </Modal>
        </>
    );
};
  
export default Dashboard;
