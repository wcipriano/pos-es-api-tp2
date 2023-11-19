const swaggerDefinition = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Supermercado on Online - Loja de Produtos alimentícios",
      version: "0.9.0",
      description: `Loja Online de Produtos Eletrônicos: Recursos: Produtos, Categorias, Avaliações de Clientes.<br/>
                    TP2 - Projeto de API. Engenharia de software - Puc Minas - <b>AWS - Grupo 3</b>`,
      license: {
        name: "Git Hub",
        url: "https://github.com/wcipriano/pos-es-api-tp2",
      },
      contact: {
        name: "Prod version on line",
        url: "https://pos-es-api-tp2.onrender.com/api-docs",
        email: "993540@sga.pucminas.br",
      },
    },
    servers: [
      {
        url: "http://127.0.0.1:5252/api/v1",
        description: "Local Development V1",
      },
      {
        url: "https://pos-es-api-tp2.onrender.com/api/v1",
        description: "Production server V1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        StatusOperation: {
          type: "object",
          properties: {
            updated: {
              type: "integer",
              description: "Quantidade de recursos atualizados",
            },
            inserted: {
              type: "integer",
              description: "Quantidade de recursos inseridos",
            },
          },
          example: {
            updated: 1,
          },
        },
        Pagination: {
          type: "object",
          default: {},
          title: "The pagination Schema",
          required: [
            "total",
            "lastPage",
            "prevPage",
            "nextPage",
            "perPage",
            "currentPage",
            "from",
            "to",
          ],
          properties: {
            total: {
              type: "integer",
              default: 0,
              title: "The total Schema",
              examples: [7],
            },
            lastPage: {
              type: "integer",
              default: 0,
              title: "The lastPage Schema",
              examples: [2],
            },
            prevPage: {
              type: "null",
              default: null,
              title: "The prevPage Schema",
              examples: [null],
            },
            nextPage: {
              type: "integer",
              default: 0,
              title: "The nextPage Schema",
              examples: [2],
            },
            perPage: {
              type: "integer",
              default: 0,
              title: "The perPage Schema",
              examples: [5],
            },
            currentPage: {
              type: "integer",
              default: 0,
              title: "The currentPage Schema",
              examples: [1],
            },
            from: {
              type: "integer",
              default: 0,
              title: "The from Schema",
              examples: [0],
            },
            to: {
              type: "integer",
              default: 0,
              title: "The to Schema",
              examples: [5],
            },
          },
          examples: [
            {
              total: 7,
              lastPage: 2,
              prevPage: null,
              nextPage: 2,
              perPage: 5,
              currentPage: 1,
              from: 0,
              to: 5,
            },
          ],
        },
        Categoria: {
          type: "object",
          required: ["nome", "descricao"],
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated id of the category",
            },
            nome: {
              type: "string",
              description: "Nome da categoria",
            },
            descricao: {
              type: "string",
              description: "Descrição da categoria",
            },
          },
          example: {
            nome: "Condimento",
            descricao: "Misturas criadas indutrialmente",
          },
        },
        Produto: {
          type: "object",
          required: ["descricao", "valor"],
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated id of the product",
            },
            descricao: {
              type: "string",
              description: "Nome do produto",
            },
            valor: {
              type: "number",
              description: "valor do produto",
            },
            marca: {
              type: "string",
              description: "Marca do produto",
            },
            categoriaid: {
              type: "integer",
              description: "Código da categoria do produto",
            },
          },
          example: {
            descricao: "Batata Palha 333gr",
            valor: 6.01,
            marca: "Elma Chips",
            categoriaid: 5,
          },
        },
        Usuario: {
          type: "object",
          required: ["nome", "email", "login", "senha"],
          properties: {
            id: {
              type: "integer",
              readOnly: true,
              description: "The auto-generated id of the user",
            },
            nome: {
              type: "string",
              description: "Nome do usuario",
            },
            email: {
              type: "string",
              description: "Email do usuario",
            },
            login: {
              type: "string",
              description: "Login do usuário",
            },
            senha: {
              type: "string",
              writeOnly: true,
              description: "Senha",
            },
            roles: {
              type: "string",
              readOnly: true,
              description: "Role",
            },
          },
          example: {
            id: 1,
            nome: "user",
            email: "user@abc.com.br",
            login: "user",
            senha: "1234",
            roles: "USER",
          },
        },
        UsuarioLogin: {
          type: "object",
          required: ["login", "senha"],
          properties: {
            login: {
              type: "string",
              description: "Login do usuário",
            },
            senha: {
              type: "string",
              writeOnly: true,
              description: "Senha",
            },
          },
          example: {
            login: "admin",
            senha: "1234",
          },
        },
        Avaliacao: {
          type: "object",
          required: ["usuarioid", "produtoid", "texto", "curtidas"],
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated id of the Avaliation",
            },
            usuarioid: {
              type: "integer",
              description: "Usuario que escreveu o comentário",
            },
            produtoid: {
              type: "integer",
              description: "Produto que recebeu o comentário",
            },
            texto: {
              type: "string",
              description: "Comentário",
            },
            curtidas: {
              type: "integer",
              description: "Quantia de curtidas maior que 0",
            },
          },
          example: {
            usuarioid: 1,
            produtoid: 3,
            texto: "Perfeitas condições",
            curtidas: 1,
          },
        },
        ArrayOfProduct: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Produto",
          },
          examples: {
            objectExample: {
              $ref: "#/components/schemas/Produto",
            },
          },
        },
      },
    },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    tags: [
      {
        name: "Usuários",
        description: "API de gerenciamento de Usuários",
      },
      {
        name: "Produtos",
        description: "API de gerenciamento de produtos",
      },
      {
        name: "Categorias",
        description: "API de gerenciamento de categorias de produtos",
      },
      {
        name: "Avaliações",
        description: "API de gerenciamento de avaliações de produtos",
      },
    ],
    paths: {
      "/security/login": {
        post: {
          tags: ["Usuários"],
          summary: "Autenticar usuário e gerar token de acesso",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UsuarioLogin",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário autenticado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Usuario",
                  },
                },
              },
            },
            401: {
              description: "Operação não permitida",
            },
            400: {
              description: "Requisição inválida",
            },
          },
        },
      },
      "/security": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Usuários"],
          summary: "Listar Usuários (somente role admin)",
          responses: {
            200: {
              description: "O response com a lista de usuários",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Usuario",
                    },
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
          },
        },
      },
      "/security/register": {
        post: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Usuários"],
          summary: "Registrar usuário (somente role admin)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Usuario",
                },
              },
            },
          },
          responses: {
            200: {
              description: "usuário registrado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        description: "Id do usuário",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Operação não permitida",
            },
          },
        },
      },
      "/categorias": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Categorias"],
          summary: "Retorna a lista de itens",
          responses: {
            200: {
              description: "O response com a lista de itens",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Categoria",
                    },
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
          },
        },
        post: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Categorias"],
          summary: "Cria um novo item",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Categoria",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Item inserido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Categoria",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
          },
        },
      },
      "/categorias/{id}": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Categorias"],
          summary: "Retorna um item pelo id",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do item",
            },
          ],
          responses: {
            200: {
              description: "O response do item de código solicitado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Categoria",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
        put: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Categorias"],
          summary: "Retorna um item pelo id",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do item",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Categoria",
                },
              },
            },
          },
          responses: {
            200: {
              description: "A quantidade de itens inseridos ou atualizados",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/StatusOperation",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
        delete: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Categorias"],
          summary: "Remove um item a partir do id",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do item",
            },
          ],
          responses: {
            204: {
              description: "O item foi deletado",
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
      },
      "/produtos": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Produtos"],
          summary: "Retorna a lista de itens",
          responses: {
            200: {
              description: "O response com a lista de itens",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        $ref: "#/components/schemas/ArrayOfProduct",
                      },
                      pagination: {
                        $ref: "#/components/schemas/Pagination",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
          },
        },
        post: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Produtos"],
          summary: "Cria um novo item",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Produto",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Item inserido",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Produto",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
          },
        },
      },
      "/produtos/{id}": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          summary: "Retorna um item pelo id",
          tags: ["Produtos"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do item",
            },
          ],
          responses: {
            200: {
              description: "O response do item de código solicitado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Produto",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
        put: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Produtos"],
          summary: "Retorna um item pelo id",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do item",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Produto",
                },
              },
            },
          },
          responses: {
            200: {
              description: "A quantidade de itens inseridos ou atualizados",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/StatusOperation",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
        delete: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Produtos"],
          summary: "Remove um item a partir do id",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do item",
            },
          ],
          responses: {
            204: {
              description: "O item foi deletado",
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
      },
      "/avaliacoes/produtos/{productId}": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Avaliações"],
          summary: "Retorna a lista de avaliacoes em um produto",
          parameters: [
            {
              in: "path",
              name: "productId",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do produto",
            },
          ],
          responses: {
            200: {
              description: "Lista de avaliações do produto",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Avaliacao",
                    },
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
      },
      "/avaliacoes/usuarios/{userId}": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Avaliações"],
          summary: "Retorna a lista de avaliacoes em um produto",
          parameters: [
            {
              in: "path",
              name: "userId",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do usuário",
            },
          ],
          responses: {
            200: {
              description: "Lista de avaliações do usuário",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Avaliacao",
                    },
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
      },
      "/avaliacoes/produtos/{productId}/usuarios/{userId}": {
        get: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Avaliações"],
          summary:
            "Retorna a lista de avaliacoes de um usuario em determinado produto",
          parameters: [
            {
              in: "path",
              name: "productId",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do produto",
            },
            {
              in: "path",
              name: "userId",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código do usuário",
            },
          ],
          responses: {
            200: {
              description: "Lista de avaliações do usuário para o produto",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Avaliacao",
                    },
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
      },
      "/avaliacoes": {
        post: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Avaliações"],
          summary: "Cria uma nova avaliação",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Avaliacao",
                },
              },
            },
          },
          responses: {
            200: {
              description: "A avaliacao foi inserida",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Avaliacao",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
          },
        },
      },
      "/avaliacoes/{id}": {
        put: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Avaliações"],
          summary: "Atualiza uma avaliacao pelo ID",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código da avaliação",
            },
          ],
          responses: {
            200: {
              description: "A avaliacao foi inserida ou atualizada",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/StatusOperation",
                  },
                },
              },
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
        delete: {
          security: [
            {
              bearerAuth: [],
            },
          ],
          tags: ["Avaliações"],
          summary: "Remove uma avaliacao a partir do id",
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "integer",
              },
              required: true,
              description: "Código da avaliação",
            },
          ],
          responses: {
            204: {
              description: "A avaliacao foi deletada",
            },
            401: {
              description: "Acesso não permitido",
            },
            404: {
              description: "Não encontrado",
            },
          },
        },
      },
    },
  },
  schemes: ["https", "http"],
  apis: ["./api/routes/*.js"],
};

module.exports = swaggerDefinition;
