import { response } from "../helpers/Response.js";
import { categoryModel } from "../models/category.model.js";
import { postModel } from "../models/post.model.js";

const categoryCtrl = {};

// Listar categorías
categoryCtrl.list = async (req, reply) => {
  try {
    const categorias = await categoryModel.find();
    response(reply, 200, true, categorias, "Lista de categorías.");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

// Listar categorías por ID
categoryCtrl.listOne = async (req, reply) => {
  try {
    const { id } = req.params;
    const categoria = await categoryModel.findById(id);
    const postRelacionado = await postModel.find({ category: id });

    if (!categoria) {
      return response(reply, 404, false, "", "Categoría no encontrada. :(");
    }
    response(
      reply,
      200,
      true,
      { categoria, postsRelacionados: postRelacionado },
      "La categoría ha sido encontrada con éxito"
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

// Crear una categoría
categoryCtrl.add = async (req, reply) => {
  try {
    const nuevaCategoria = await categoryModel.create(req.body);
    response(reply, 201, true, nuevaCategoria, "Categoría creada. :)");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};
// Eliminar categoría
categoryCtrl.delete = async (req, reply) => {
  try {
    const { id } = req.params;
    const categoria = await categoryModel.findById(id);
    if (!categoria) {
      return response(reply, 404, false, "", "Categoría no encontrada. :(");
    }

    await categoria.deleteOne();
    response(reply, 200, true, "", "Categoría eliminada. :)");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

// Actualizar categoría
categoryCtrl.update = async (req, reply) => {
  try {
    const { id } = req.params;
    const categoria = await categoryModel.findById(id);
    if (!categoria) {
      return response(reply, 404, false, "", "Categoría encontrada. :)");
    }
    await categoria.updateOne(req.body);
    response(reply, 200, true, "", "Categoría actualizada. :)");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default categoryCtrl;
