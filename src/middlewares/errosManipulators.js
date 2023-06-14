import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ResquestIncorrect from "../erros/ResquestIncorrect.js";
import ErroValidation from "../erros/ErroValidatiom.js";



// eslint-disable-next-line no-unused-vars
function errorsManipulators(erro, req, res, next){

    if(erro instanceof mongoose.Error.CastError){

        new ResquestIncorrect().enviarResposta(res);

    }else if(erro instanceof mongoose.Error.ValidationError){

       new ErroValidation(erro).enviarResposta(res);

    }else if(erro instanceof ErroBase){
        erro.enviarResposta(res)
    }
    else{
        new ErroBase().enviarResposta(res);
    }
}

export default errorsManipulators