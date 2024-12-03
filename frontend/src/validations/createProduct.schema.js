import * as Yup from "yup";

const createProductSchema = Yup.object().shape({
    title: Yup.string()
        .required("El nombre del producto es obligatorio"),
    price: Yup.string()
        .required("El precio es obligatorio") 
        .test("not-zero", "El precio no puede ser 0.00", (value) => value !== "0.00"),
    description: Yup.string()
        .required("La descripción es obligatoria"),
    stock: Yup.number()
        .transform((value, originalValue) => {
            return originalValue === "" ? 0 : value;})
        .positive("El stock no puede ser negativo") 
        .integer("El stock debe ser un número entero"),
    name: Yup.string()
        .notOneOf(["Plataformas"], "Debes seleccionar un plataforma")
        .required("Debes seleccionar un plataforma"),
    genre: Yup.string()
        .notOneOf(["Generos"], "Debes seleccionar un género")
        .required("Debes seleccionar un género"),
    model: Yup.string()
        .notOneOf(["Modelos"], "Debes seleccionar un modelo")
        .required("Debes seleccionar un modelo"),
});

export default createProductSchema;
