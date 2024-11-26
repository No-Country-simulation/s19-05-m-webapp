import * as Yup from "yup";

export const checkoutSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  address: Yup.string().required("La dirección es obligatoria"),
  city: Yup.string().required("La ciudad es obligatoria"),
  postalCode: Yup.string()
    .required("El código postal es obligatorio")
    .matches(/^\d+$/, "Debe ser un número válido"),
  country: Yup.string()
    .notOneOf(["Países"], "Debes seleccionar un país")
    .required("Debes seleccionar un país"),
});
