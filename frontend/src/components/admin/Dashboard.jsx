import Modal from "../modal/Modal";
import Form from "../form/Form";
import Table from "../table/Table";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import columns from "../../utils/tableAdmin";
import productFields  from "../../utils/productFields";
import productService from "../../services/products";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const { data: products } = useFetch(productService.getProducts);

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
            <Table 
                columns={columns.productsList}
                data={products}  
            />
        </>
    );
};
  
export default Dashboard;
