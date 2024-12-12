import * as Yup from "yup";

const productSchema = Yup.object().shape({
    title: Yup.string()
        .required("El nombre del producto es obligatorio"),
    price: Yup.string()
        .required("El precio es obligatorio") 
        .test("not-zero", "El precio no puede ser 0.00", (value) => value !== "0.00"),
    description: Yup.string()
        .required("La descripción es obligatoria"),
    stock: Yup.number()
        .min(0, "El stock no puede ser negativo") 
        .integer("El stock debe ser un número entero"),
    name: Yup.string()
        .notOneOf(["Plataformas"], "Debes seleccionar una plataforma")
        .required("Debes seleccionar un plataforma"),
    genre: Yup.string()
        .notOneOf(["Generos"], "Debes seleccionar un género")
        .required("Debes seleccionar un género"),
});

export default productSchema;
