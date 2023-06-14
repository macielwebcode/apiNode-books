import ResquestIncorrect from "./ResquestIncorrect.js";

class ErroValidation extends ResquestIncorrect{
    constructor(erro){
        
        const mensagensErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ");

        super(`Os seguintes erros foram encontrados: ${mensagensErro}`)
    }
}

export default ErroValidation