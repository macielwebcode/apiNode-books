import authormodel from "../models/Author.js";
import { booksmodel } from "../models/index.js";

class LivroController{
    static listarBooks = async (req, res, next) => {
        try {

            const buscaBooks = booksmodel.find();
            req.resultado = buscaBooks;
            next()

         }catch (erro) {
            next(erro)
         }
    }

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if(busca !== null){

                const livrosResult = booksmodel
                .find(busca)
                .populate("autor");

                req.resultado = livrosResult;
                next();
            }else{
                res.status(200).send([]);
            }

            

        } catch (erro) {
            next(erro)
        }
    }

    static cadastrarLivro = async (req, res, next) => {

        try {
            let livro = new booksmodel(req.body);
            const bookResult = await livro.save()
            res.status(201).send(bookResult.toJSON())
        } catch (erro) {
            next(erro)
        }

    }

    static atualizarLivro = async (req, res) => {

        try {
            const id = req.params.id;
          
            await booksmodel.findOneAndUpdate({id}, {$set: req.body}, {
                new: true,
                upsert: true,
                rawResult: true
            })
            res.status(200).send({message: 'livro atualizao com sucesso'})
            
        } catch (error) {
            res.status(500).send({message: error.message})
        }

    }

    static listaLivroPorId = async (req, res) =>{
        try {
            const id = req.params.id;
            const livrosResult = await booksmodel.findById(id).exec();
            res.status(200).json(livrosResult)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;
            // let body = req.body;
            await booksmodel.findByIdAndDelete({_id: id}, {$set: req.body}, {
                new: true
                // upsert: true,
                // rawResult: true
            })
            res.status(200).send({message: 'livro removio com sucesso'})
            
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

            
}

async function processaBusca(parametros){
    const {editora, titulo, minPaginas, maxPaginas, nomeautor} = parametros;

    // const regex = new RegExp(titulo, "i");

    let busca = {};

    if(editora) busca.editora = editora;
    if(titulo) busca.titulo = { $regex: titulo, $options: "i"};
    if(minPaginas || maxPaginas) busca.numeroPaginas = {};

    if(nomeautor){
        const autor = await authormodel.findOne({ autor: nomeautor });

        if(autor !== null){
            const idautor = autor._id;

            busca.autor = idautor;
        }else{
            busca = null;
        }

        
    }

    // gte é o operador: maior ou igual que: nativo no mongoose
    // lte é o operador menor ou igual que nativo do mongoose

    if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    return busca;
}

export default LivroController