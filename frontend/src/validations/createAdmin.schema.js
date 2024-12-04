import * as yup from "yup";

const createAdminSchema = yup.object().shape({
    name: yup
        .string()
        .required("El nombre del administrador es obligatorio"), 

    email: yup
        .string()
        .email("El correo electrónico debe ser válido")
        .required("El correo electrónico es obligatorio"),

    state: yup
        .boolean()
        .required("El estado es obligatorio") 
        .oneOf([true, false], "El estado debe ser verdadero o falso"), 
});

export default createAdminSchema;
