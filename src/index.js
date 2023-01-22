import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import multer from "fastify-multer";
import { conectarDb } from "./database.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { postRoutes } from "./routes/post.routes.js";

// Conectar con la base de datos
conectarDb()

// Inicializar el servidor de fastify
const fastify = Fastify({
    logger: true
})

fastify.register(cors, {origin: "*"});
fastify.register(formBody);
fastify.register(multer.contentParser);

// RUTAS
fastify.register(categoryRoutes, {prefix: "/category"})
fastify.register(postRoutes, {prefix: "/post"})


// Puerto para inicializar el backend
const start = async () => {
    try {
        await fastify.listen({port: 4000, host: "0.0.0.0"})
        console.log("El servidor está escuchando por el puerto 4000")
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();
