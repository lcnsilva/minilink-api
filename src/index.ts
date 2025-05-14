import express from "express";
import cors from 'cors';
import 'dotenv/config'
import routes from "./routes/routes";
import { swaggerSpec } from './swagger';
import swaggerUi from 'swagger-ui-express';

//criar pagina de notfound (e talvez link expirado)
//estudar possibilidade de mudar a lógica de delete para softdelete(active/disabled)
//estudar possibilidade de usar o redis
//URGENTE: ajustar as validações da entrada de dados nos posts.
//ver também se rotas diferentes é a melhor forma de separar entre onlyletters e onlynumbers
//FAZER TESTES 
//encontrar uma maneira melhor de retornar dois objetos de forma mais segura.
//criar validação do expirationInMinutes para recusar valores não setados.
//criar um aviso na url customizada que o link é público e qualquer um pode acessar.
//testar as rotas com valores inesperados
//testar para dar errado
//teste pra dar certo
//test de integração 
//usar cypress
//testar todos os métodos com o jest+supertest
//PROXIMO PROJETO COM WEBSOCKET = CONSUMIR ALGO E TRATAR ESSES DADOS ( e se der usar IA(gemini 0800))

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins : string[] = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://minilink-one.vercel.app/'
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
app.use(routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta localhost:${PORT}`);
});