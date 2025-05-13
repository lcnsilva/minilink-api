import { Request, Response, Router } from "express";
import { apiReference } from '@scalar/express-api-reference'
import Url from "../controllers/url";

const routes = Router();

routes.get('/:shortUrl', Url.redirectUrl);
routes.post('/shorten/number', Url.createOnlyNumber)
routes.post('/shorten/letter', Url.createOnlyLetterUrl)
routes.post('/shorten', Url.createShortenUrl)
routes.post('/shorten/custom', Url.createCustomUrl)

routes.get('/test', (req: Request, res: Response) => {
    res.send('Welcome to Minilink API')
})

routes.use(
    '/', 
    apiReference({
        
    })
)

export default routes