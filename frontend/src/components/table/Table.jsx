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
    const [currentProduct, setCurrentProduct] = useState(null);
    const { elementRef, downloadPDF } = useBillDownload(`factura_${currentProduct?.name}`);
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
            case 'Editar-estado':
                setModalTitle('Editar Estado');
                break;
            default:
                setModalTitle('Acción no especificada');
        }
        
        setModalHeight(actionType === 'Eliminar' || actionType === 'Editar-estado' ? '50vh' : '98vh');
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
                                        <p>No hay productos para mostrar</p>
                                    </td>
                                </tr>
                        ) : visibleData?.slice().reverse().map((p) => (
                                <tr key={p.id}> 
                                    {
                                        Object.keys(p)
                                            .filter((key) => key !== "id" && key !== "full")
                                            .map((key) => (
                                                <td key={key}>{p[key]}</td> 
                                            )
                                        )
                                    }
                                    {
                                        admin && filterType !== "orders" ? (
                                            <td className="container-admin-buttons">
                                                <button className="btn-edit" 
                                                    onClick={() => handleAction(p.full, "Editar")}>
                                                    <i className="bx bx-edit"></i>
                                                </button>
                                                <button className="btn-delete" 
                                                    onClick={() => handleAction(p.full, "Eliminar")}>
                                                    <i className="bx bx-trash"></i>
                                                </button>
                                            </td>
                                        ) : (
                                            <>
                                                <td>
                                                    <button className="btn-see" 
                                                        onClick={() => handleAction(p.full, "Ver")}>
                                                        <i className="bx bx-show"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn-edit" 
                                                        onClick={() => handleAction(p.full, "Editar-estado")}>
                                                        <i className="bx bx-edit"></i>
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
                        modalTitle === 'Editar Producto' && currentProduct ? (
                            <Form
                                fields={productFields.fields} 
                                onSubmit={handleUpdateSubmit}
                                initialValues={currentProduct}
                                className="form-admin"
                                buttonText={loading ? "Cargando..." : "Actualizar producto"}
                                errors={errors}
                            />
                    ) : modalTitle === 'Factura' && currentProduct ? (
                        <div ref={elementRef}>
                            <Bill product={currentProduct} />
                        </div>
                    ) : modalTitle === 'Editar Estado' && currentProduct ? ( 
                        <div className="container-order">
                            <p>Cambiar estado del pedido de <strong>{currentProduct?.name}</strong></p>
                            <p>Aquí va el select</p>
                            <button>
                                {loading ? "Cargando..." : "Confirmar"}
                            </button>
                        </div>
                    ) : (
                        <div className="container-delete">
                            <p>¿Estás seguro de eliminar el producto <strong>{currentProduct?.title}</strong>?</p>
                            <button 
                                onClick={() => handleDeleteSubmit(currentProduct?.id_product)}>
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
