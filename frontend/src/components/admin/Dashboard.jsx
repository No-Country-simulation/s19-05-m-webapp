import { useState } from "react";
import { Toaster } from 'sonner';
import Modal from "../modal/Modal";
import Form from "../form/Form";
import Table from "../table/Table";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import columns from "../../utils/tableAdmin";
import productFields  from "../../utils/productFields";
import createProductSubmit from "../../utils/createProduct";
import validateForm from "../../utils/validateForm";
import productService from "../../services/products";
import createProductSchema from "../../validations/createProduct.schema";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const { data: products, loading: productsLoading, 
        hasError: productsError, refetch } = useFetch(productService.getProducts);
    const [filterType, setFilterType] = useState("all");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const filteredProducts = products?.filter(product => 
        filterType === "all" ? product.stock > 0 : product.stock === 0
    );

    const handleCloseModal = () => {
        setErrors({}); 
        closeModal();  
    };

    const handleCreateSubmit = async (formValues) => {
        setLoading(true);  
        const validationResult = await validateForm(formValues, createProductSchema);
    
        if (!validationResult.isValid) {
            setErrors(validationResult.errors);
            setLoading(false);  
            return; 
        }
    
        await createProductSubmit(formValues, refetch);
        setLoading(false);  
        handleCloseModal(); 
    };
    
    return (
        <>
            <h1 className="admin-title">Dashboard Administrador</h1>
            <div className="admin-buttons">
                <button onClick={openModal}>Crear producto</button>
                <button onClick={() => setFilterType("all")}>Ver todos los productos</button>
                <button onClick={() => setFilterType("outOfStock")}>Productos sin stock</button>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title="Crear producto"
                className="modal-admin">
                <Form
                    fields={productFields.fields} 
                    onSubmit={handleCreateSubmit}
                    initialValues={productFields.initialValues}
                    className="form-admin"
                    buttonText={loading ? "Cargando..." : "Crear producto"}
                    errors={errors}
                />
            </Modal>
            <Table 
                columns={columns.productsList}
                data={filteredProducts} 
                loadingData={productsLoading}
                errorData={productsError} 
                refetch={refetch}
                admin={true}
            />
            <Toaster
                richColors
                position="top-center"
            />
        </>
    );
};
  
export default Dashboard;
