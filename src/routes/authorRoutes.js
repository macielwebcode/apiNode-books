import express from "express";
import AuthorController from "../controllers/authorsController.js";
import paginar from "../middlewares/paginar.js";


const router = express.Router();

router
    .get("/autores", AuthorController.listarAuthors, paginar)
    .post("/autores", AuthorController.cadastrarAuthor)
    .put("/autores/:id", AuthorController.atualizarAuthor)
    .get("/autores/:id", AuthorController.listaAuthorPorId)
    .delete("/autores/:id", AuthorController.excluirAuthor)

export default router;