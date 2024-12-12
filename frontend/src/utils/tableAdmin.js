const productsList = [
    { 
        header: 'Producto', 
        field: 'product' 
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
        field: 'date' 
    },
    { 
        header: 'Estado del pago', 
        field: 'status' 
    },
    { 
        header: 'Factura', 
        field: 'bill' 
    }
];

const usersList = [
    { 
        header: 'Nombre del cliente', 
        field: 'name' 
    },
    { 
        header: 'Correo electrónico', 
        field: 'email' 
    },
    { 
        header: 'Estado', 
        field: 'status' 
    },
    { 
        header: 'Rol', 
        field: 'role' 
    },
    { 
        header: 'Acciones', 
        field: 'actions' 
    }
];

const columns = {
    productsList,
    ordersList,
    usersList
}

export default columns;
