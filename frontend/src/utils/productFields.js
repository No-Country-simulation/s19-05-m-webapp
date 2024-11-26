import options from "./options";

const fields = [
    { 
        name: "name", 
        label: "Nombre del Producto", 
        type: "text", 
        placeholder: "Ingresa el nombre del producto" 
    },
    { 
        name: "price", 
        label: "Precio", 
        type: "number", 
        placeholder: "Ingresa el precio" 
    },
    { 
        name: "description", 
        label: "Descripción", 
        type: "textarea", 
        placeholder: "Descripción del producto" 
    },
    { 
        name: "image", 
        label: "Imagen", 
        type: "file", 
        placeholder: "Selecciona una imagen" 
    },
    { 
        name: "stock", 
        label: "Stock", 
        type: "number", 
        placeholder: "Cantidad en stock" 
    },
    {
        name: "console",
        label: "Seleccionar consola",
        type: "select",
        options: options.consoleOptions,
    },
    {
        name: "category",
        label: "Seleccionar categoría",
        type: "select",
        options: options.categoryOptions,
    },
];

const initialValues = {
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    console: "",
    category: ""
};

const productFields = {
    fields,
    initialValues
}

export default productFields;
