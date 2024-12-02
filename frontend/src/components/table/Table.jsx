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

    const filteredData = data?.map((p) => {
        if (admin) {
            return {
                id: p.id_product,
                title: p.title,
                price: p.price,
                stock: p.stock,
                fullProduct: p 
            };
        } else {
            // para el usuario normal
        }
    });
    
    const handleAction = (product, actionType) => {
        const productWithEmptyFile = {
            ...product,
            image: "" 
        };

        setCurrentProduct(productWithEmptyFile);
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
                        filteredData?.map((p) => (
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
