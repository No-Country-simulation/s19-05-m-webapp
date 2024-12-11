import * as Yup from "yup";

const userSchema = Yup.object().shape({
    email: Yup.string()
        .required("El email del usuario es obligatorio"),
});

export default userSchema;
