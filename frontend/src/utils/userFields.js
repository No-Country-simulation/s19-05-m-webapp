import options from "./options";

const fields = [
    { 
        name: "email", 
        label: "Correo Electrónico *", 
        type: "text", 
        placeholder: "Ingrese el correo electrónico" 
    },
    {
        name: "active",
        label: "Seleccionar Estado",
        type: "select",
        options: options.userActive,
    }
];

const initialValues = {
    email: "",
    active: ""
};

const userFields = {
    fields,
    initialValues
}

export default userFields;
