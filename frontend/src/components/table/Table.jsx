import { useState } from "react";
import Modal from "../modal/Modal";
import Form from "../form/Form";
import useModal from "../../hooks/useModal";
import productFields from "../../utils/productFields";
import createProductSchema from "../../validations/createProduct.schema";
import validateForm from "../../utils/validateForm";
import "./table.css";

const Table = ({ columns, data, admin = false }) => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [modalTitle, setModalTitle] = useState("");
    const [modalHeight, setModalHeight] = useState("");
    const [currentProduct, setCurrentProduct] = useState(null);
    const [errors, setErrors] = useState({});
    
    const handleAction = (product, actionType) => {
        console.log(`${actionType} producto:`, product);
        setCurrentProduct(product);
        setModalTitle(actionType === 'Editar' ? 'Editar Producto' : 'Eliminar Producto')
        setModalHeight(actionType === 'Eliminar' ? '50vh' : '98vh');
        openModal();
    };

    const handleSubmit = async (formValues) => {
        const validationResult = await validateForm(formValues, createProductSchema);
    
        if (validationResult.isValid) {
            console.log('se válido bien')
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
                        data?.map((product) => (
                            <tr key={product.id}>
                                {
                                    Object.keys(product)
                                        .filter((key) => key !== "id") 
                                        .map((key) => (
                                            <td key={key}>{product[key]}</td> 
                                        )
                                    )
                                }
                                {
                                    admin && (
                                        <td className="container-admin-buttons">
                                        <button className="btn-edit" 
                                            onClick={() => handleAction(product, "Editar")}>
                                            <i className="bx bx-edit"></i>
                                        </button>
                                        <button className="btn-delete" 
                                            onClick={() => handleAction(product, "Eliminar")}>
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
                onClose={closeModal} 
                title={modalTitle}
                height={modalHeight}>
                <div>
                    {
                        modalTitle === 'Editar Producto' && currentProduct && (
                            <Form
                                fields={productFields.fields} 
                                onSubmit={handleSubmit}
                                initialValues={currentProduct}
                                className="btn-action-admin"
                                buttonText="Actualizar producto"
                                errors={errors}
                            />
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Table;
