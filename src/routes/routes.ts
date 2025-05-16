import { Request, Response, Router } from "express";
import Url from "../controllers/url";

const routes = Router();

// /**
//  * @swagger
//  * /{shortUrl}:
//  *   get:
//  *     summary: Redireciona para a URL original a partir do shortUrl
//  *     tags: [URL]
//  *     parameters:
//  *       - in: path
//  *         name: shortUrl
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Código da URL encurtada
//  *     responses:
//  *       302:
//  *         description: Redirecionamento para a URL original
//  *       404:
//  *         description: URL não encontrada
//  */
routes.get('/:shortUrl', Url.redirectUrl);

/**
 * @swagger
 * /shorten/number:
 *   post:
 *     summary: Cria uma URL encurtada contendo apenas números
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *               - expirationTimeInMinutes
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://exemplo.com"
 *               expirationTimeInMinutes:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: URL encurtada criada com sucesso
 *       400:
 *         description: A URL não está correta.
 */
routes.post('/shorten/number', Url.createOnlyNumber)

/**
 * @swagger
 * /shorten/letter:
 *   post:
 *     summary: Cria uma URL encurtada contendo apenas letras
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *               - expirationTimeInMinutes
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://exemplo.com"
 *               expirationTimeInMinutes:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: URL encurtada criada com sucesso
 *       400:
 *         description: A URL não está correta.
 */
routes.post('/shorten/letter', Url.createOnlyLetterUrl)

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Cria uma URL encurtada padrão
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *               - expirationTimeInMinutes
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://exemplo.com"
 *               expirationTimeInMinutes:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: URL encurtada criada com sucesso
 *       400:
 *         description: A URL não está correta.
 */
routes.post('/shorten', Url.createShortenUrl)

/**
 * @swagger
 * /shorten/custom:
 *   post:
 *     summary: Cria uma URL encurtada personalizada
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *               - expirationTimeInMinutes
 *               - customUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://exemplo.com"
 *               expirationTimeInMinutes:
 *                 type: integer
 *                 example: 60
 *               customUrl:
 *                 type: string
 *                 example: "meulink"
 *     responses:
 *       201:
 *         description: URL encurtada personalizada criada com sucesso
 *       400:
 *         description: Bad Request.
 *       409:
 *          description: A URL customizada já existe.
 */
routes.post('/shorten/custom', Url.createCustomUrl);

/**
 * @swagger
 * /api/clicks:
 *   get:
 *      summary: Retorna todas as URLs encurtadas organizadas por maior quantidade de cliques.
 *      tags: [URL]
 *      responses:
 *          200:
 *              description: Lista de links ordenada.
 *          404:
 *              description: Não existe nenhuma URL encurtada no banco de dados.
 */
routes.get('/api/clicks', Url.getUrlClickRank);

routes.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Minilink API");
})

export default routes