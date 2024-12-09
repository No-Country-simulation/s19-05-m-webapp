import { useState, useEffect } from "react";
import { Toaster } from 'sonner';
import Modal from "../modal/Modal";
import Form from "../form/Form";
import Table from "../table/Table";
import SearchBar from "../searchBar/SearchBar";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import columns from "../../utils/tableAdmin";
import productFields  from "../../utils/productFields";
import createProductSubmit from "../../utils/createProduct";
import validateForm from "../../utils/validateForm";
import productService from "../../services/products";
import checkoutService from "../../services/checkouts";
import userService from "../../services/users";
import productSchema from "../../validations/product.schema";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const { data: products, loading: productsLoading, 
        hasError: productsError, refetch } = useFetch(productService.getProducts);
    const { data: orders, loading: ordersLoading, 
        hasError: ordersError } = useFetch(checkoutService.getCheckouts);
    const { data: users, loading: usersLoading, 
        hasError: usersError, refetch: usersRefetch } = useFetch(userService.getUsers);
    const [filterType, setFilterType] = useState("orders");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products?.filter(product => 
        filterType === "all" ? product.stock > 0 : product.stock === 0
    );

    const filteredData = filterType === "orders" 
    ? orders?.filter(order => order.shopping_user?.toLowerCase().includes(searchTerm.toLowerCase())) 
    : filterType === "users"
      ? users?.filter(user => user.name?.toLowerCase().includes(searchTerm.toLowerCase()))
      : filteredProducts?.filter(product => product.title?.toLowerCase().includes(searchTerm.toLowerCase()));


    useEffect(() => {
        setSearchTerm("");
    }, [filterType]);

    const handleCloseModal = () => {
        setErrors({}); 
        closeModal();  
    };

    const handleCreateSubmit = async (formValues) => {
        setLoading(true);  
        const validationResult = await validateForm(formValues, productSchema);
    
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
                <button onClick={() => setFilterType("orders")}>Gestionar Pedidos</button>
                <button onClick={() => setFilterType("users")}>Gestionar Usuarios</button>
            </div>
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
            <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm}/> 
            <Table 
                columns = { 
                    filterType === "orders" 
                    ? columns.ordersList 
                    : filterType === "users" 
                    ? columns.usersList 
                    : columns.productsList 
                }
                data={filteredData} 
                loadingData={filterType === "orders" ? 
                    ordersLoading : filterType === "users" ? 
                    usersLoading : productsLoading}
                errorData={filterType === "orders" ? 
                    ordersError : filterType === "users" ? 
                    usersError : productsError}
                refetch={filterType !== "users" ? refetch : usersRefetch}
                admin={true}
                filterType={filterType}
            />
            <Toaster
                richColors
                position="top-center"
            />
        </>
    );
};
  
export default Dashboard;
