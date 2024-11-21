export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API",
            version: "1.0.0",
            description: "API description",
        },
        servers: [
            {
                url: "http://localhost:3000",
            }
        ]
    },
    apis: ["./src/routers/*.ts"]
}