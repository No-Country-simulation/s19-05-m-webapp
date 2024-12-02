import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import Form from "../form/Form";
import Table from "../table/Table";
import useFetch from "../../hooks/useFetch";
import useCrud from "../../hooks/useCrud";
import useModal from "../../hooks/useModal";
import columns from "../../utils/tableAdmin";
import productFields  from "../../utils/productFields";
import productService from "../../services/products";
import createProductSchema from "../../validations/createProduct.schema";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const { data: products } = useFetch(productService.getProducts);
    const [newProduct, setNewProduct] = useState(null);  
    const { req: createProduct, res: createRes } = useCrud(productService.createProduct, newProduct);
    const [filterType, setFilterType] = useState("all");
    const [errors, setErrors] = useState({});

    const filteredProducts = products?.filter(product => 
        filterType === "all" ? product.stock > 0 : product.stock === 0
    );

    const handleCloseModal = () => {
        setErrors({}); 
        closeModal();  
    };

    const handleSubmit = (formValues) => {
        createProductSchema
        .validate(formValues, { abortEarly: false })
        .then(() => { 
            setNewProduct(formValues); 
        })
        .catch((validationErrors) => {
            const formattedErrors = {};
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            setErrors(formattedErrors);
        });
    };

    useEffect(() => {
        if (newProduct) {
            createProduct();
            handleCloseModal();
            console.log('hola')
        }
    }, [newProduct]);

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
                title="Crear producto">
                <Form
                    fields={productFields.fields} 
                    onSubmit={handleSubmit}
                    initialValues={productFields.initialValues}
                    className="btn-action-admin"
                    buttonText="Crear producto"
                    errors={errors}
                />
            </Modal>
            <Table 
                columns={columns.productsList}
                data={filteredProducts}  
                admin={true}
            />
        </>
    );
};
  
export default Dashboard;
