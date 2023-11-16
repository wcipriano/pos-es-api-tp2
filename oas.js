const oas_conf = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Supermercado on Online - Loja de Produtos alimentícios",
      version: "0.1.0",
      description:
        "Loja Online de Produtos Eletrônicos: Recursos: Produtos, Categorias, Avaliações de Clientes. TP2 - Projeto de API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Grupo 3 - Api.Web.Ser. Engenharia Software - PucMG",
        url: "https://pos-es-api-tp2.onrender.com/",
        email: "993540@sga.pucminas.br",
      },
    },
    servers: [
      {
        url: "http://127.0.0.1:5252/",
        description: "Local Development server",
        description: "Local Development server",
      },
      {
        url: "https://pos-es-api-tp2.onrender.com/",
        description: "Production server",
      },
    ],
  },
  apis: ["./api/routes/*.js"],
};

module.exports = oas_conf;
