import { useState } from "react";
import { Toaster, toast } from 'sonner';
import Modal from "../modal/Modal";
import Form from "../form/Form";
import Table from "../table/Table";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import columns from "../../utils/tableAdmin";
import productFields  from "../../utils/productFields";
import productService from "../../services/products";
import createProductSchema from "../../validations/createProduct.schema";
import validateForm from "../../utils/validateForm";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const { data: products } = useFetch(productService.getProducts);
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

    const handleSubmit = async (formValues) => {
        const validationResult = await validateForm(formValues, createProductSchema);
    
        if (validationResult.isValid) {
            const prueba = {
                title : formValues.title,
                price: Number(formValues.price),
                stock : Number(formValues.stock),
                description : formValues.description,
                genre : formValues.genre,
                type: 'hola',
                image: '/imagen.prueba',
                platforms: []
            }

            setLoading(true); 
            try {
                await productService.createProduct(prueba);
                toast.success('Producto creado correctamente!');
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);  
                handleCloseModal();  
            }

        } else {
            setErrors(validationResult.errors); 
        }
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
                title="Crear producto">
                <Form
                    fields={productFields.fields} 
                    onSubmit={handleSubmit}
                    initialValues={productFields.initialValues}
                    className="btn-action-admin"
                    buttonText={loading ? "Cargando..." : "Crear producto"}
                    errors={errors}
                />
            </Modal>
            <Table 
                columns={columns.productsList}
                data={filteredProducts}  
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
