import { useState } from "react";
import { Toaster } from "sonner";
import Modal from "../modal/Modal";
import Bill from "../bill/Bill";
import Form from "../form/Form";
import Loader from "../loader/Loader";
import useModal from "../../hooks/useModal";
import useBillDownload from "../../hooks/useBillDownload";
import useFilteredTable from "../../hooks/useFilteredTable";
import productFields from "../../utils/productFields";
import InfiniteScroll from "../infiniteScroll/InfiniteScroll";
import updateProductSubmit from "../../utils/updateProduct";
import deleteProductSubmit from "../../utils/deleteProduct";
import validateForm from "../../utils/validateForm";
import createProductSchema from "../../validations/createProduct.schema";
import "./table.css";

const Table = ({ columns, data, loadingData, errorData, refetch, admin = false, filterType }) => {
    const { visibleData, hasMore, handleLoadMore } = useFilteredTable(data, admin, filterType);
    const { isModalOpen, openModal, closeModal } = useModal();
    const [modalTitle, setModalTitle] = useState("");
    const [modalHeight, setModalHeight] = useState("");
    const [className, setClassName] = useState("");
    const [currentObj, setCurrentObj] = useState(null);
    const { elementRef, downloadPDF } = useBillDownload(`factura_${currentObj?.shopping_user}`);
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

        setCurrentObj(productWithEmptyFile);
        
        switch (actionType) {
            case 'Editar':
                setModalTitle('Editar Producto');
                break;
            case 'Eliminar':
                setModalTitle('Eliminar Producto');
                break;
            case 'Ver':
                setModalTitle('Factura');
                break;
            default:
                setModalTitle('Acción no especificada');
        }
        
        setModalHeight(actionType === 'Eliminar' ? '50vh' : '98vh');
        setClassName(actionType === 'Editar' ? 'modal-admin' : "");
        openModal();
    };

    const handleUpdateSubmit = async (formValues) => {
        setLoading(true);  
        const validationResult = await validateForm(formValues, createProductSchema);
    
        if (!validationResult.isValid) {
            setErrors(validationResult.errors);
            setLoading(false);  
            return; 
        }

        await updateProductSubmit(formValues, refetch);
        setLoading(false);  
        handleCloseModal(); 
    };
    
    const handleDeleteSubmit = async (id) => {
        setLoading(true);
        await deleteProductSubmit(id, refetch);
        setLoading(false);  
        closeModal();
    }

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
                        ) : data?.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length}>
                                        <p>No hay {filterType === "orders" ? 'pedidos': 'productos'} para mostrar</p>
                                    </td>
                                </tr>
                        ) : visibleData?.slice().reverse().map((obj) => (
                                <tr key={obj.id}> 
                                    {
                                        Object.keys(obj)
                                            .filter((key) => key !== "id" && key !== "full")
                                            .map((key) => (
                                                <td key={key}>{obj[key]}</td> 
                                            )
                                        )
                                    }
                                    {
                                        admin && filterType !== "orders" ? (
                                            <td className="container-admin-buttons">
                                                <button className="btn-edit" 
                                                    onClick={() => handleAction(obj.full, "Editar")}>
                                                    <i className="bx bx-edit"></i>
                                                </button>
                                                <button className="btn-delete" 
                                                    onClick={() => handleAction(obj.full, "Eliminar")}>
                                                    <i className="bx bx-trash"></i>
                                                </button>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="container-admin-buttons">
                                                    <button className="btn-see" 
                                                        onClick={() => handleAction(obj.full, "Ver")}>
                                                        <i className="bx bx-show"></i>
                                                    </button>
                                                </td>
                                            </>
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
                        modalTitle === 'Editar Producto' && currentObj ? (
                            <Form
                                fields={productFields.fields} 
                                onSubmit={handleUpdateSubmit}
                                initialValues={currentObj}
                                className="form-admin"
                                buttonText={loading ? "Cargando..." : "Actualizar producto"}
                                errors={errors}
                            />
                    ) : modalTitle === 'Factura' && currentObj ? (
                        <div ref={elementRef}>
                            <Bill order={currentObj} />
                        </div>
                    ) : (
                        <div className="container-delete">
                            <p>¿Estás seguro de eliminar el producto <strong>{currentObj?.title}</strong>?</p>
                            <button 
                                onClick={() => handleDeleteSubmit(currentObj?.id_product)}>
                                {loading ? "Cargando..." : "Confirmar"}
                            </button>
                        </div>
                    )
                }
                </div>
                {
                    modalTitle === 'Factura' && (
                        <div className="container-bill">
                            <button onClick={downloadPDF}>
                                Descargar PDF
                            </button>
                        </div>
                    )
                }
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
