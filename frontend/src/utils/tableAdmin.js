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

const columns = {
    productsList,
    ordersList
}

export default columns;
