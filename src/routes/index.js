import express from "express";
import booksRouter from "./booksRoutes.js";
import authorRouter from "./authorRoutes.js";


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "está okokok a conexao e retorno da api"})
    })

    app.use(
        express.json(),
        booksRouter,
        authorRouter
        
    )
}

export default routes;