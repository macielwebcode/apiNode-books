import express from "express";
import LivroController from "../controllers/booksController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/livros", LivroController.listarBooks, paginar)
    .post("/livros", LivroController.cadastrarLivro)
    .get("/livros/busca", LivroController.listarLivroPorFiltro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .get("/livros/:id", LivroController.listaLivroPorId)
    .delete("/livros/:id", LivroController.excluirLivro)

export default router;