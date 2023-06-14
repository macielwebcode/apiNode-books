import ErroBase from "./ErroBase.js";

class NotFound extends ErroBase{
    constructor(mensagem = "Página Não Encontrada"){
        super(mensagem, 404)
    }
}

export default NotFound