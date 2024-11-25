const fields = [
  {
    name: "name",
    label: "Nombre completo",
    placeholder: "Nombre completo",
    type: "text",
  },
  {
    name: "address",
    label: "Dirección",
    placeholder: "Dirección",
    type: "text",
  },
  {
    name: "city",
    label: "Ciudad",
    placeholder: "Ciudad",
    type: "text",
  },
  {
    name: "postalCode",
    label: "Código postal",
    placeholder: "Código postal",
    type: "text",
  },
  {
    name: "country",
    label: "País",
    type: "select",
    options: [
      { value: "", label: "Seleccione un país", disabled: true },
      { value: "Argentina", label: "Argentina" },
      { value: "Bolivia", label: "Bolivia" },
      { value: "Chile", label: "Chile" },
      { value: "Colombia", label: "Colombia" },
      { value: "Ecuador", label: "Ecuador" },
      { value: "España", label: "España" },
      { value: "Mexico", label: "México" },
      { value: "Peru", label: "Perú" },
      { value: "Uruguay", label: "Uruguay" },
      { value: "Venezuela", label: "Venezuela" },
    ],
  },
];

const initialValues = {
  name: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const checkoutFields = {
  fields,
  initialValues,
};

export default checkoutFields;
