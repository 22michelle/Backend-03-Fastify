import postCtrl from "../controllers/post.controller.js";
import { upload } from "../middleware/imgUpload.js";
import { postValidSchema } from "../validSchema/postValid.js";

export const postRoutes = (fastify, opts, done) => {
  fastify.get("/", postCtrl.list);
  fastify.get("/:id", postCtrl.listOne);

  fastify.post(
    "/",
    { schema: postValidSchema, preValidation: upload.single("img") },
    postCtrl.add
  );

  fastify.put(
    "/:id",
    { schema: postValidSchema, preValidation: upload.single("img") },
    postCtrl.update
  );

  fastify.delete("/:id", postCtrl.delete);

  done();
};
