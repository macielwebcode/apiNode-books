import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import errorsManipulators from "./middlewares/errosManipulators.js";
import manipulador404 from "./middlewares/manipulador404.js";


db.on("error", console.log.bind(console, 'erro de connection'))
db.once("open", ()=>{
    console.log("conexão ok deu bom")
})

const app = express();

app.use(express.json())

routes(app);

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(errorsManipulators);


export default app