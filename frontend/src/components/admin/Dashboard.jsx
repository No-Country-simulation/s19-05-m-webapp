/* import { useState } from "react";
import { Toaster, toast } from 'sonner';
import Modal from "../modal/Modal";
import Form from "../form/Form";
import Table from "../table/Table";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import columns from "../../utils/tableAdmin";
import productFields  from "../../utils/productFields";
import productService from "../../services/products";
import usersService from "../../services/users";
import createProductSchema from "../../validations/createProduct.schema";
import validateForm from "../../utils/validateForm";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const { data: products } = useFetch(productService.getProducts);
    const [filterType, setFilterType] = useState("all");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showAdmins, setShowAdmins] = useState(false);

    const { data: users, error, isLoading } = useFetch(usersService.getUsers);
    const filteredAdmins = users?.filter(user => user.role === "ADMINISTRATOR") || [];

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
            <button onClick={openModal}>Crear nuevo administrador</button>
            <button onClick={() => setShowAdmins(!showAdmins)}>
                    {showAdmins ? "Ocultar administradores" : "Ver todos los administradores"}
                </button>
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
                    onSubmit={handleSubmit}
                    initialValues={productFields.initialValues}
                    className="form-admin"
                    buttonText={loading ? "Cargando..." : "Crear producto"}
                    errors={errors}
                />
            </Modal>
            <Table
                columns={columns.productsList}
                data={filteredProducts}
                admin={true}
            />
            {showAdmins && (
                <div className="admin-table">
                    {isLoading && <p>Cargando administradores...</p>}
                    {error && <p>Error al cargar administradores: {error.message}</p>}
                    {!isLoading && !error && (
                        <Table
                            columns={columns.usersList}
                            data={filteredAdmins}
                            admin={true}
                        />
                    )}
                </div>
            )}
            <Toaster richColors position="top-center" />
        </>
    );
};
  
export default Dashboard; */
import { useState } from "react";
import { Toaster, toast } from 'sonner';
import Modal from "../modal/Modal";
import Form from "../form/Form";
import Table from "../table/Table";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import columns from "../../utils/tableAdmin";
import productFields from "../../utils/productFields";
import adminFields from "../../utils/adminFields"; 
import productService from "../../services/products";
import usersService from "../../services/users";
import createProductSchema from "../../validations/createProduct.schema";
import createAdminSchema from "../../validations/createAdmin.schema";
import validateForm from "../../utils/validateForm";
import "./dashboard.css";

const Dashboard = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const { data: products } = useFetch(productService.getProducts);
    const { data: users, error, isLoading } = useFetch(usersService.getUsers);
    const [filterType, setFilterType] = useState("all");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState("");
    const [showAdmins, setShowAdmins] = useState(false);

    const filteredAdmins = users?.filter(user => user.role === "ADMINISTRATOR") || [];
    const filteredProducts = products?.filter(product => 
        filterType === "all" ? product.stock > 0 : product.stock === 0
    );

    const handleCloseModal = () => {
        setErrors({});
        closeModal();
    };

    const handleSubmitProduct = async (formValues) => {
        const validationResult = await validateForm(formValues, createProductSchema);

        if (validationResult.isValid) {
            const newProduct = {
                title: formValues.title,
                price: Number(formValues.price),
                stock: Number(formValues.stock),
                description: formValues.description,
                genre: formValues.genre,
                type: "producto",
                image: "/imagen.prueba",
                platforms: [],
            };

            setLoading(true);
            try {
                await productService.createProduct(newProduct);
                toast.success("Producto creado correctamente!");
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

    const handleSubmitAdmin = async (formValues) => {
        const validationResult = await validateForm(formValues, createAdminSchema);

        if (validationResult.isValid) {
            setLoading(true);
            try {
                await usersService.createUser({
                    name: formValues.name,
                    email: formValues.email,
                    password: formValues.password,
                    role: "ADMINISTRATOR",
                });
                toast.success("Administrador creado correctamente!");
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
                <button onClick={() => { setFormType("admin"); openModal(); }}>Crear nuevo administrador</button>
                <button onClick={() => setShowAdmins(!showAdmins)}>
                    {showAdmins ? "Ocultar administradores" : "Ver todos los administradores"}
                </button>
            </div>
            <div className="admin-buttons">
                <button onClick={() => { setFormType("product"); openModal(); }}>Crear producto</button>
                <button onClick={() => setFilterType("all")}>Ver todos los productos</button>
                <button onClick={() => setFilterType("outOfStock")}>Productos sin stock</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={formType === "admin" ? "Crear administrador" : "Crear producto"}
                className="modal-admin"
            >
                <Form
                    fields={formType === "admin" ? adminFields.fields : productFields.fields}
                    onSubmit={formType === "admin" ? handleSubmitAdmin : handleSubmitProduct}
                    initialValues={formType === "admin" ? adminFields.initialValues : productFields.initialValues}
                    className="form-admin"
                    buttonText={loading ? "Cargando..." : `Crear ${formType === "admin" ? "administrador" : "producto"}`}
                    errors={errors}
                />
            </Modal>
            <Table
                columns={columns.productsList}
                data={filteredProducts}
                admin={true}
            />
            {showAdmins && (
                <div className="admin-table">
                    {isLoading && <p>Cargando administradores...</p>}
                    {error && <p>Error al cargar administradores: {error.message}</p>}
                    {!isLoading && !error && (
                        <Table
                            columns={columns.usersList}
                            data={filteredAdmins}
                            admin={true}
                        />
                    )}
                </div>
            )}
            <Toaster richColors position="top-center" />
        </>
    );
};

export default Dashboard;
