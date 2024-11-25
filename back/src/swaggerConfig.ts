export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Checkpoint zone - API",
      version: "1.0.0",
      description: "API de Checkpoint zone - E-commerce",
    },
    servers: [
      {
        url: "https://checkpoint-zone-api.onrender.com/api/",
      },
    ],
    components: {
      schemas: {
        ProductInput: {
          type: "object",
          required: ["title", "price"],
          properties: {
            title: {
              type: "string",
              description: "Título del producto",
            },
            price: {
              type: "number",
              description: "Precio del producto",
            },
            available: {
              type: "boolean",
              description: "Disponibilidad del producto",
              default: true,
            },
            description: {
              type: "string",
              description: "Descripción del producto",
            },
            type: {
              type: "string",
              description: "Tipo de producto",
            },
            image: {
              type: "string",
              description: "URL de la imagen del producto",
            },
            genre: {
              type: "string",
              description: "Género del producto",
            },
            stock: {
              type: "integer",
              description: "Cantidad en stock del producto",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            id_product: {
              type: "integer",
              description: "ID del producto",
            },
            title: {
              type: "string",
              description: "Título del producto",
            },
            price: {
              type: "number",
              description: "Precio del producto",
            },
            available: {
              type: "boolean",
              description: "Disponibilidad del producto",
            },
            description: {
              type: "string",
              description: "Descripción del producto",
            },
            type: {
              type: "string",
              description: "Tipo de producto",
            },
            image: {
              type: "string",
              description: "URL de la imagen del producto",
            },
            genre: {
              type: "string",
              description: "Género del producto",
            },
            stock: {
              type: "integer",
              description: "Cantidad en stock del producto",
            },
            platforms: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Platform",
              },
            },
          },
        },
        Platform: {
          type: "object",
          properties: {
            id_platform: {
              type: "integer",
              description: "ID de la plataforma",
            },
            name: {
              type: "string",
              description: "Nombre de la plataforma",
            },
            // Agrega otras propiedades si es necesario
          },
        },
        // Agrega otros esquemas si es necesario
      },
    },
  },
  apis: ["./src/routers/*.ts"],
};
