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
        name: "name",
        label: "Seleccionar Plataforma",
        type: "select",
        options: options.platformOptions,
    },
    {
        name: "model",
        label: "Seleccionar Modelo",
        type: "select",
        options: options.modelOptions,
    },
    {
        name: "genre",
        label: "Seleccionar Género",
        type: "select",
        options: options.genreOptions,
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
