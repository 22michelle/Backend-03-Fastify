export const categoryValidSchema = {
    body: {
        type: "object",
        required: [
            "nombre"
        ],
        properties: {
            nombre: {
                type: "string",
                minLength: 5
            }
        }
    }
}