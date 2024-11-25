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
        type: "text", 
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
    }
];

const initialValues = {
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
};

const productFields = {
    fields,
    initialValues
}

export default productFields;
