const productsList = [
    { 
        header: 'Nombre', 
        field: 'name' 
    },
    { 
        header: 'Precio', 
        field: 'price' 
    },
    { 
        header: 'Stock', 
        field: 'stock' 
    },
    { 
        header: 'Acciones', 
        field: 'actions' 
    }
];

const ordersList = [
    { 
        header: 'Nombre del cliente', 
        field: 'name' 
    },
    { 
        header: 'Fecha del pedido', 
        field: 'price' 
    },
    { 
        header: 'Estado', 
        field: 'status' 
    },
    { 
        header: 'Acciones', 
        field: 'actions' 
    }
];

const columns = {
    productsList,
    ordersList
}

export default columns;
