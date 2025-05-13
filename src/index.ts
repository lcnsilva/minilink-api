import Url from "./url";
import express, { Request, Response} from "express";
import cors from 'cors';
import 'dotenv/config'

//criar opção de link personalizavel
//criar opção para remover do banco após periodo de tempo
//criar opção para utilizar apenas numeros
//criar opção para utilizar apenas letras
//criar pagina de notfound (e talvez link expirado)
//estudar possibilidade de mudar a lógica de delete para softdelete(active/disabled)
//estudar possibilidade de usar o redis

//URGENTE: ajustar as validações da entrada de dados nos posts.
//ver também se rotas diferentes é a melhor forma de separar entre onlyletters e onlynumbers
//FAZER TESTES 
//separar as pastas, rotas, controllers, etc
//tirar o ts-node-dev do projeto quando finalizar o dockerfile


//PROXIMO PROJETO COM WEBSOCKET = CONSUMIR ALGO E TRATAR ESSES DADOS

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins : string[] = [
    'http://localhost:5173',
    'http://localhost:3000'
]

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/:shortUrl', Url.redirectUrl);
app.post('/shorten/number', Url.createOnlyNumber)
app.post('/shorten/letter', Url.createOnlyLetterUrl)
app.post('/shorten', Url.createShortenUrl)
app.post('/shorten/custom', Url.createCustomUrl)

app.get('/', (req: Request, res: Response) => {
    res.send('teste')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta localhost:${PORT}`);
});