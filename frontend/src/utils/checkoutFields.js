import options from "./options";

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
    options: options.countryOptions,
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
