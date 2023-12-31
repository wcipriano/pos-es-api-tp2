## TP2 - Projeto de API (OpenAPI Specification)

Pos-graduação Especialização em Engenharia de Software - PucMG - APIs e Webservices - Trabalho Prático 2 - Projeto de API (OpenAPI Specification)

### Integrantes grupo

Nomes e cód pessoa

1. Wager Cipriano - 993540
2. Lucas Willian - 1116622
3. Hugo Somers - 1439214
4. Renan Olivé - 178563

## Hospegagem

> [!NOTE]
> Esta api está hospedada no [render](https://render.com/) em uma <b>instancia gratuita</b>.

> [!IMPORTANT]
> Instâncias gratuitas entram em estado de hibernação quando ficam inativas, SEM receber requisições por mais de 15min.
> SE OPTAR por utilizar a versão hospedada tenha **consciência deste fato** !

> [!WARNING]
> Com isso, uma primeira requisição pode **demorar até 5min** para que a instancia volte para o estado ativo novamente.
> Mas depois, para as próximas requisições passa a responder normalmente.

$\color{gray}{Segue\ o\ endereço\ para\ acesso\ à\ API:}$
[https://pos-es-api-tp2.onrender.com/api](https://pos-es-api-tp2.onrender.com/api-docs)

## TP2

Implementação de uma API REST para o cenário escolhido de tal forma que outras aplicações possam realizar operações de CRUD (Create, Read, Update, Delete) nos recursos principais e recursos associados/relacionados.

[Link da Atividade no LMS](https://pucminas.instructure.com/courses/152486/assignments/801993?module_item_id=3681959)

## Banco de dados:

O banco de dados foi implementado no Postgresql, versão 15, está hospedado no Render (render.com), com a seguinte configuração do plano gratuito:

`Free RAM 256MB CPU 100m Storage 1GB`

> [!IMPORTANT]
> The database will expire on January 30, 2024.

## Resources Endpoints GET

- Get all Products: https://pos-es-api-tp2.onrender.com/api/v1/produtos
- Get Product by Id: https://pos-es-api-tp2.onrender.com/api/v1/produtos/:Id
- Get Avaliations by product ID: https://pos-es-api-tp2.onrender.com/api/v1/avaliacoes/:productId
- Get Avaliations by user ID: https://pos-es-api-tp2.onrender.com/api/v1/avaliacoes/user/:userId
- Get Avaliations by user ID within a product: https://pos-es-api-tp2.onrender.com/api/v1/avaliacoes/produtos/:productId/usuarios/:userId

- Get all categorys: https://pos-es-api-tp2.onrender.com/api/v1/categoria
- Get Category by category ID: https://pos-es-api-tp2.onrender.com/api/v1/categoria/:categoryid
- Get all the products in the category: https://pos-es-api-tp2.onrender.com/api/v1/categoria/:categoryid

## Resources Endpoints POST

- Create Category: https://pos-es-api-tp2.onrender.com/api/v1/categoria
- Create Avaliation: https://pos-es-api-tp2.onrender.com/api/v1/avaliacao
- - Exemplo body: {"usuarioid": 1, "produtoid": 2, "texto": "Excelente produto, mas falta sal", "curtidas": 150}

## Resources Endpoints DELETE

- Delete Category: https://pos-es-api-tp2.onrender.com/api/v1/avaliacoes/:categoryId
- Delete Avaliation: https://pos-es-api-tp2.onrender.com/api/v1/avaliacoes/:avaliationId

## Resources Endpoints PUT

- Update category: https://pos-es-api-tp2.onrender.com/api/v1/avaliacoes/:categoryId
- Update Avaliation: https://pos-es-api-tp2.onrender.com/api/v1/avaliacoes/:avaliationId
- - Exemplo body: {"usuarioid": 1, "produtoid": 2, "texto": "Excelente produto, mas falta sal", "curtidas": 15}

## RESTFull API

- Allowed Methods: GET, POST, PUT, DELETE
- Padrão de endpoints de parâmetros para filtros, ordenação, etc: [json-server](https://github.com/typicode/json-server#json-server-)

## Ferramentas e Arquitetura:

- Node + Express
- Docker: Container BD Postgres (development - local)
- Versionamento: Github
- Banco de dados: Postgresql: render.com
- Hospedagem Aplicação: render.com

### Componentes:

- bcryptjs: "^2.4.3",
- cors: "^2.8.5",
- dotenv: "^16.3.1",
- express: "^4.18.2",
- express-hateoas-links: "^1.3.1",
- jsonwebtoken: "^9.0.2",
- knex: "^3.0.1",
- knex-paginate: "^3.1.1",
- pg: "^8.11.3",
- swagger-jsdoc: "^6.2.8",
- swagger-ui-express: "^5.0.0"

## Create local Database

1. Create postgres instance (container or localhost)
1. Configure database access (host, port, user, passwd)
1. Conn instance
1. Create database name tp2db
1. Execute Script.sql1
1. Create or get local database string connection -
   DATABASE_URL. Example: postgres://{user}:{passwd}@{host}/tp2db

## How to configure Local Deploy

1. Clone project:
   `git clone https://github.com/wcipriano/pos-es-api-tp2.git`
1. Open project folder:
   `cd pos-es-api-tp2/`
1. Create `.env.development` file on the project root dir, use `.env.example` as a template, configure keys like: `PORT, SECRET_KEY, DATABASE_URL and PG_SSL`

   Comand to create a **SECRET_KEY**: `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`
   **DATABASE_URL**: your local database string connection

1. If you want to connecto to production database, also create `.env.production` file

1. Install node, npm and nvm (if necessary): [link](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
1. Set npm version: `nvm use v20.8.0`. See the versions below:

   ```json
   "npm": ">=9.6.2 <=10.2.0",
   "node": ">=14.17.0 <=20.8.0"
   ```

1. Install packages: `npm install`
1. Run the application: `npm run dev`

## Projeto

Utilize [este link](./test/Insomnia_rest_client.json) para baixar o arquivo JSON do projeto para subir em uma ferramenta de testes (insomnia, Postman, etc)

## Backlog:

- [x] Proposta:
      Loja Online de Produtos Eletrônicos: Recursos: Produtos, Categorias, Avaliações de Clientes.
- [x] Autenticação e autorização
- [x] API REST - operações CRUD - base com a tabela de produtos e usuários/autenticação
- [x] Resource Categorias
- [x] Resource Avaliações
- [x] OpenAPI Specification: Swagger.
- [x] Exemplos de uso
- [x] Servidor Mock
- [x] Estratégias de HATEOAS (paginação)
- [x] Especificação de versionamento da API: Via PATH. Semantic Versioning: Manor.Minor.Patch: Breaking.Feature.Fix
- [x] Paginação, Filtros e Ordenação
- [x] Estratégias de HATEOAS (paginação)

## REFS:

- [10 Best Practices for Writing Node.js REST APIs](https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis#7useconditionalrequests)
- [HTTP Methods](https://restfulapi.net/http-methods/)
- [How to secure a REST API using JWT authentication](https://blog.logrocket.com/secure-rest-api-jwt-authentication/)
- [Knex Query Builder](https://knexjs.org/guide/query-builder.html)
- [Documenting your Express API with Swagger](https://blog.logrocket.com/documenting-express-js-api-swagger/)
- [OpenAPI Specification v3.1.0](https://spec.openapis.org/oas/v3.1.0)
- [Swagger Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/)
-
