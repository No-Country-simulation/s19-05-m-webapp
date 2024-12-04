import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';
import Modal from "../modal/Modal";
import Form from "../form/Form";
import useModal from "../../hooks/useModal";
import useFilteredTable from "../../hooks/useFilteredTable";
import productService from "../../services/products";
import productFields from "../../utils/productFields";
import createProductSchema from "../../validations/createProduct.schema";
import validateForm from "../../utils/validateForm";
import InfiniteScroll from "../infiniteScroll/InfiniteScroll";
import "./table.css";

const Table = ({ columns, data, admin = false }) => {
    const { visibleData, hasMore, handleLoadMore } = useFilteredTable(data, admin);
    const { isModalOpen, openModal, closeModal } = useModal();
    const [modalTitle, setModalTitle] = useState("");
    const [modalHeight, setModalHeight] = useState("");
    const [className, setClassName] = useState("");
    const [currentProduct, setCurrentProduct] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        setErrors({}); 
        closeModal();  
    };
    
    const handleAction = (product, actionType) => {
        const productWithEmptyFile = {
            ...product,
            image: "" 
        };

        setCurrentProduct(productWithEmptyFile);
        setModalTitle(actionType === 'Editar' ? 'Editar Producto' : 'Eliminar Producto')
        setModalHeight(actionType === 'Eliminar' ? '50vh' : '98vh');
        setClassName(actionType === 'Editar' ? 'modal-admin' : "");
        openModal();
    };

    const handleSubmit = async (formValues) => {
        const validationResult = await validateForm(formValues, createProductSchema);
    
        if (validationResult.isValid) {
            const updatedFormValues = { ...formValues };
            delete updatedFormValues.model;
            delete updatedFormValues.name;
        
            if (!updatedFormValues.image) {
                updatedFormValues.image = '/ruta-image'; 
            }

            setLoading(true); 
            
            try {
                await productService.editProduct(updatedFormValues.id_product, updatedFormValues);
                toast.success('Producto editado correctamente!');
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
        <div className="custom-table-wrapper ">
            <table className="custom-table">
                <thead>
                    <tr>
                        {
                            columns.map((col) => (
                                <th key={col.field}>{col.header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        visibleData?.map((p) => (
                            <tr key={p.id}> 
                                {
                                    Object.keys(p)
                                        .filter((key) => key !== "id" && key !== "fullProduct")
                                        .map((key) => (
                                            <td key={key}>{p[key]}</td> 
                                        )
                                    )
                                }
                                {
                                    admin && (
                                        <td className="container-admin-buttons">
                                        <button className="btn-edit" 
                                            onClick={() => handleAction(p.fullProduct, "Editar")}>
                                            <i className="bx bx-edit"></i>
                                        </button>
                                        <button className="btn-delete" 
                                            onClick={() => handleAction(p.fullProduct, "Eliminar")}>
                                            <i className="bx bx-trash"></i>
                                        </button>
                                        </td>
                                    )
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title={modalTitle}
                height={modalHeight}
                className={className}>
                <div>
                    {
                        modalTitle === 'Editar Producto' && currentProduct && (
                            <Form
                                fields={productFields.fields} 
                                onSubmit={handleSubmit}
                                initialValues={currentProduct}
                                className="form-admin"
                                buttonText={loading ? "Cargando..." : "Actualizar producto"}
                                errors={errors}
                            />
                    )}
                </div>
            </Modal>
            <InfiniteScroll 
                onLoadMore={handleLoadMore} 
                hasMore={hasMore} 
            />
            <Toaster
                richColors
                position="top-center"
            />
        </div>
    );
};

export default Table;
