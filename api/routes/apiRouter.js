const express = require("express");
let apiRouter = express.Router();
const endpoint = "/";
const lista_produtos = {
  produtos: [
    { id: 1, descricao: "Produto 1", valor: 5.0, marca: "marca " },
    { id: 2, descricao: "Produto 2", valor: 5.0, marca: "marca " },
    { id: 3, descricao: "Produto 3", valor: 5.0, marca: "marca " },
  ],
};
apiRouter.get(endpoint + "produtos", function (req, res) {
  res.status(200).json(lista_produtos);
});

module.exports = apiRouter;
