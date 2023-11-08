## TP2 - Projeto de API (OpenAPI Specification)

Pos-graduação Especialização em Engenharia de Software - PucMG - APIs e Webservices - Trabalho Prático 2 - Projeto de API (OpenAPI Specification)

### Integrantes grupo

Nomes e cód pessoa

1. Wager Cipriano - 993540
1. Lucas Willian - 1116622
1. Hugo Somers - 1439214
1.

## Hospegagem

> [!NOTE]
> Esta api está hospedada no [render](https://render.com/) em uma <b>instancia gratuita</b>.

> [!IMPORTANT]
> Instâncias gratuitas entram em estado de hibernação quando ficam inativas, se receber requisições por mais de 15min.
> SE OPTAR por utilizar a versão hospedada tenha **conciência deste fato** !

> [!WARNING]
> Com isso, uma primeira requisição pode **demorar até 5min** para que a instancia volte para o estado ativo novamente.
> Mas depois, para as próximas requisições passa a responder normalmente.

$\color{gray}{Segue\ o\ endereço\ para\ acesso\ à\ API:}$
[https://pos-es-api-tp2.onrender.com/api](https://pos-es-api-tp2.onrender.com/api/)

## TP2

Implementação de uma API REST para o cenário escolhido de tal forma que outras aplicações possam realizar operações de CRUD (Create, Read, Update, Delete) nos recursos principais e recursos associados/relacionados.

[Link da Atividade no LMS](https://pucminas.instructure.com/courses/152486/assignments/801993?module_item_id=3681959)

## Banco de dados:

O banco de dados foi implementado no Postgresql, versão 15, está hospedado no Render (render.com), com a seguinte configuração do plano gratuito:

`Free RAM 256MB CPU 100m Storage 1GB`

> [!IMPORTANT]
> The database will expire on January 30, 2024.

## Resources Endpoints GET

- Get all Products: https://pos-es-api-tp2.onrender.com/api/produtos
- Get Product by Id: https://pos-es-api-tp2.onrender.com/api/produtos/:Id

## RESTFull API

Allowed Methods: GET, POST, PUT, DELETE

## Ferramentas e Arquitetura:

- Node + Express
- Github
- render.com
- Postgresql

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
2. Open project folder:
   `cd pos-es-api-tp2/`
3. Create _.env_ file on the project root dir, and insert keys: `PORT, SECRET_KEY, DATABASE_URL`

   Comand to create a **SECRET_KEY**: `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`
   **DATABASE_URL**: your local database string connection

4. Install node, npm and nvm (if necessary): [link](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
5. Set npm version: `nvm use v20.8.0`. See the versions below:

   ```json
   "npm": ">=9.6.2 <=10.2.0",
   "node": ">=14.17.0 <=20.8.0"
   ```

6. Install packages: `npm install`
7. Run the application: `npm run dev`

## Projeto

Utilize [este link](./test/Insomnia_rest_client.json) para baixar o arquivo JSON do projeto para subir em uma ferramenta de testes (insomnia, Postman, etc)

## Backlog:

- [x] Proposta:
      Loja Online de Produtos Eletrônicos: Recursos: Produtos, Categorias, Avaliações de Clientes.
- [x] Autenticação e autorização
- [x] API REST - operações CRUD - base com a tabela de produtos e usuários/autenticação
- [ ] Resource Categorias \*
- [ ] Resource Avaliações \*

- [ ] OpenAPI Specification: Swagger.
      $\color{gray}{OBS.:\ Tem\ exemplo\ na\ aula\ do\ dia\ 01/11,\ a\ partir\ do\ time\ 3:05:00,\ disponivel\ }$ [neste link](https://bit.ly/3QHrPO3).
- [ ] Exemplos de uso
- [ ] Servidor Mock

- [ ] Estratégias de HATEOAS

- [ ] Especificação de versionamento da API: Via PATH. Semantic Versioning: Manor.Minor.Patch: Breaking.Feature.Fix

* Disponibilizar recursos principais e recursos associados/relacionados.
* Definição e disponibilização de recursos, endpoints e respectivos parâmetros
* Formatos de dados e códigos de resposta
* Paginação, Filtros e Ordenação

## REFS:

- [10 Best Practices for Writing Node.js REST APIs](https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis#7useconditionalrequests)
- [HTTP Methods](https://restfulapi.net/http-methods/)
- [How to secure a REST API using JWT authentication](https://blog.logrocket.com/secure-rest-api-jwt-authentication/)
- [Knex Query Builder](https://knexjs.org/guide/query-builder.html)
-
