import NotFound from "../erros/NotFound.js";
import { authormodel } from "../models/index.js";

class AuthorController{
    static listarAuthors = async (req, res, next) => {
        try {
            const authorResult =  authormodel.find();

            req.resultado = authorResult;

            next();
             
         } catch (error) {
             res.status(500).json(error);
         }
    }

    static cadastrarAuthor = async (req, res, next) => {

        try {
            let author = new authormodel(req.body);
            const authorResult = await author.save();
            res.status(201).send(authorResult.toJSON())
        } catch (erro) {
            next(erro)
        }

    }

    static atualizarAuthor = async (req, res, next) => {

        try {
            const id = req.params.id;

            await authormodel.findOneAndUpdate({id}, {$set: req.body}, {
                // new: true,
                // upsert: true,
                // rawResult: true
            })
            res.status(200).send({message: 'author atualizao com sucesso'})
            
        } catch (erro) {
           next(erro)
        }

    }
    

    static listaAuthorPorId = async (req, res, next) =>{
        try {
            const id = req.params.id;
            const authorResult = await authormodel.findById(id);

            if(authorResult !== null){
                res.status(200).send(authorResult)
            }else{
                next(new NotFound("Id não localizado"))
            }
            
        } catch (erro) {
            next(erro)
           
        }
    }

    static excluirAuthor = async (req, res, next) => {
        try {
            const id = req.params.id;
       
            await authormodel.findByIdAndDelete({_id: id}, {$set: req.body}, {
                // new: true
                // upsert: true,
                // rawResult: true
            })
            res.status(200).send({message: 'author removio com sucesso'})
            
        } catch (erro) {
            next(erro)
        }
    }

            
}

export default AuthorController