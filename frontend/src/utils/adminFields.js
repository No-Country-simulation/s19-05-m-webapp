const adminFields = {
  fields: [
      { name: "name", label: "Nombre", type: "text", placeholder: "Nombre del administrador" },
      { name: "email", label: "Correo electrónico", type: "email", placeholder: "Email del administrador" },
      { 
          name: "state", 
          label: "Estado", 
          type: "checkbox",
          placeholder: "Estado activo"
      },
  ],
  initialValues: {
      name: "",
      email: "",
      state: false, 
  },
};

export default adminFields;

