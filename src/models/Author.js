import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {
            type: String, 
            required: [true, "O nome é obrigatório"]
        },
        nacionalidade: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const authormodel = mongoose.model('authors', authorSchema);

export default authormodel;