import { useState } from "react";
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";
import "./table.css";

const Table = ({ columns, data, admin = false }) => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [modalTitle, setModalTitle] = useState("");
    
    const handleAction = (product, actionType) => {
        console.log(`${actionType} producto:`, product);
        setModalTitle(actionType === 'Editar' ? 'Editar Producto' : 'Eliminar Producto')
        openModal();
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
                        data?.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                {
                                    admin && ( 
                                        <td>
                                            <button onClick={() => handleAction(product, "Editar")}>😎</button>
                                            <button onClick={() => handleAction(product, "Eliminar")}>😌</button>
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
                title={modalTitle}>
                <div>
                    contenido modal
                </div>
            </Modal>
        </div>
    );
};

export default Table;
