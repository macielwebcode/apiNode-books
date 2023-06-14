import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {type: String, required: true},
        autor: {type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: true},
        editora: {
            type: String, 
            required: [true, "A editora é obrigatóra"],
            enum: {
                values: ["Sebo", "Casa do Código", "Independente"],
                message: "A editora fornecida: {VALUE} é inválida e não permitida"
            }
        },
        numeroPaginas: 
        {
            type: Number,
            validate: {
                validator: (valor) => {
                    return valor >= 10 && valor <= 5000;
                },
                message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
            }

        }
    }
);

const booksmodel = mongoose.model('books', bookSchema);

export default booksmodel;