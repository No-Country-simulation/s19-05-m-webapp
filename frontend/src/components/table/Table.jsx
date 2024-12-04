import { useState } from "react";
import { Toaster } from "sonner";
import Modal from "../modal/Modal";
import Form from "../form/Form";
import Loader from "../loader/Loader";
import useModal from "../../hooks/useModal";
import useFilteredTable from "../../hooks/useFilteredTable";
import productFields from "../../utils/productFields";
import InfiniteScroll from "../infiniteScroll/InfiniteScroll";
import updateProductSubmit from "../../utils/updateProduct";
import "./table.css";

const Table = ({ columns, data, loadingData, errorData, admin = false }) => {
    const { visibleData, hasMore, handleLoadMore } = useFilteredTable(data, admin, data);
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
        setLoading(true);  
        await updateProductSubmit(formValues, setErrors);
        setLoading(false);  
        closeModal();
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
                        errorData ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <p>{errorData}</p>
                                </td>
                            </tr>
                        ) : loadingData ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <Loader />
                                </td>
                            </tr>
                        ) : visibleData?.map((p) => (
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
                            )
                        )
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
            {
                !errorData && (
                    <InfiniteScroll 
                        onLoadMore={handleLoadMore} 
                        hasMore={hasMore} 
                    />
                )
            }
            <Toaster
                richColors
                position="top-center"
            />
        </div>
    );
};

export default Table;
