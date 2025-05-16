[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[REACT__BADGE]: https://img.shields.io/badge/React-005CFE?style=for-the-badge&logo=react
[AXIOS__BADGE]: https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4

<h1 align="center" style="font-weight: bold;">Minilink API🔗</h1>

![react][REACT__BADGE]
![javascript][JAVASCRIPT__BADGE]
![typescript][TYPESCRIPT__BADGE]
![axios][AXIOS__BADGE]

<br/>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> • 
 <a href="#-começando">Começando</a> • 
 <a href="#-tecnologias-utilizadas">Tecnologias Utilizadas</a> • 
 <a href="#-documentação-da-api">Documentação da API</a> • 
 <a href="#-desenvolvedor-do-projeto">Desenvolvedor</a> •
 <a href="#-contribua">Contribua</a>
</p>

## 🧾 Sobre o Projeto

**MiniLink** é um encurtador de URLs simples e eficiente, que permite aos usuários transformar links longos em versões curtas e fáceis de compartilhar.

Recursos principais:

- Encurtar URLs longas com apenas um clique;
- Redirecionamento automático ao acessar a URL curta;
- Opção de gerar link customizado;
- Opção de gerar link apenas com letras;
- Opção de gerar link apenas com números;
- Histórico de todos os links criados (Função experimental apenas para testes).

👉[Clique aqui para ir ao repositório com a interface do Minilink](https://github.com/lcnsilva/minilink)👈

---

## 🚀 Começando

Para rodar o projeto localmente, siga os passos abaixo.


Clone o projeto:

```bash
git clone https://github.com/lcnsilva/minilink-api.git
```

Entre no diretório:

```bash
cd minilink-api
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

---

## 🐳 Rodando com Docker

Você pode executar a API localmente usando Docker e Docker Compose. Siga os passos abaixo:

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/lcnsilva/minilink-api.git
   cd minilink-ap
   ```

2. **Crie o arquivo.env:**
    ```bash
    PORT=3000;
    DATABASE_URL="Sua string de conexão do MongoDB"
    REDIRECT_URL="URL para redirecionamento customizado caso o link não seja encontrado"
    ```
3. **Construa e suba os containers:**
    ```bash
    docker-compose up --build
    ```


---
## 💻 Tecnologias Utilizadas
- Node.js;
- TypeScript;
- MongoDB
- Prisma;
- Cors;
- Express;
- Swagger;
- Dotenv.

---

## 📍 Documentação da API

#### Redireciona para a URL

```http
  GET /:shortUrl
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `shortUrl` | `string` | Código necessário para identificar a URL. |

#### Retorna todas as URLs organizadas pela quantidade de cliques.

```http
  GET /api/clicks
```

#### Cria uma URL encurtada.

```http
  GET /shorten
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| originalUrl      | String | URL que será encurtada |
| expirationTimeInMinutes      | Int | Tempo de expiração em minutos |

#### Cria uma URL encurtada com apenas números.

```http
  GET /shorten/number
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| originalUrl      | String | URL que será encurtada |
| expirationTimeInMinutes      | Int | Tempo de expiração em minutos |

#### Cria uma URL encurtada com apenas letras.

```http
  GET /shorten/letter
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| originalUrl      | String | URL que será encurtada |
| expirationTimeInMinutes      | Int | Tempo de expiração em minutos |

#### Cria uma URL encurtada personalizada.

```http
  GET /shorten/custom
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| originalUrl      | String | URL que será encurtada |
| expirationTimeInMinutes      | Int | Tempo de expiração em minutos |
| customUrl      | String | Código personalizado para a URL encurtada|








---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
DATABASE_URL="String de conexão do MongoDB"
PORT = 3000
REDIRECT_URL="URL para página notfound"
```

---

## 👥 Desenvolvedor do Projeto

<a href="https://github.com/lcnsilva/minilink-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lcnsilva/minilink-api" />
</a>

[Luciano Silva](https://github.com/lcnsilva)

---

## 🤝 Contribua

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, forks ou pull requests.

---

## 📫 Contato

Entre em contato comigo via email lcnsilvajf@gmail.com ou [linkedin](https://www.linkedin.com/in/lcnsilva/).
