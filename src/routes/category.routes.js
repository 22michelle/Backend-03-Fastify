import categoryCtrl from "../controllers/category.controller.js";
import { categoryValidSchema } from "../validSchema/categoryValid.js";

export const categoryRoutes = (fastify, opts, done) => {
  // RUTAS
  fastify.get("/", categoryCtrl.list);
  fastify.get("/:id", categoryCtrl.listOne);

  fastify.post("/", { schema: categoryValidSchema }, categoryCtrl.add);

  fastify.put("/:id", { schema: categoryValidSchema }, categoryCtrl.update);

  fastify.delete("/:id", categoryCtrl.delete);

  done();
};
