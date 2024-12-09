import options from "./options";

const fields = [
    { 
        name: "title", 
        label: "Nombre del Producto *", 
        type: "text", 
        placeholder: "Ingresa el nombre del producto" 
    },
    { 
        name: "price", 
        label: "Precio *", 
        type: "text", 
        placeholder: "0.00" 
    },
    { 
        name: "stock", 
        label: "Stock", 
        type: "number", 
        placeholder: "0" 
    },
    { 
        name: "image", 
        label: "Imagen", 
        type: "file", 
        placeholder: "Selecciona una imagen" 
    },
    {
        name: "genre",
        label: "Seleccionar Género *",
        type: "select",
        options: options.genreOptions,
    },
    { 
        name: "description", 
        label: "Descripción *", 
        type: "textarea", 
        placeholder: "Descripción del producto" 
    },
    {
        name: "name",
        label: "Seleccionar Plataforma *",
        type: "select",
        options: options.platformOptions,
    },
    {
        name: "model",
        label: "Seleccionar Modelo",
        type: "select",
        options: [],
    },
];

const initialValues = {
    title: "",
    price: "",
    stock: 0,
    image: "",
    genre: "",
    description: "",
    type: "videogame",
    platforms: [{ name: "", model: "" }]
};

const productFields = {
    fields,
    initialValues
}

export default productFields;

