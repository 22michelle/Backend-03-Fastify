export const postValidSchema = {
    body: {
        type: "object",
        required: [
            "title",
            "description",
            "category"
        ],
        properties: {
            title: {
                type: "string",
                minLength: 5
            },
            description: {
                type: "string",
                minLength: 10
            },
            category: {
                type: "string"
            }
        }
    }
}