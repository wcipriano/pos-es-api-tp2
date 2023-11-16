const express = require("express");

let router = express.Router();
router.use(express.json());

const endpoint = "/avaliacao";

const Authorization = require("../../authorization");
const Avaliation = require("../../database/avaliation");
const avaliation = new Avaliation();
const auth = new Authorization();

//Param validation
router.param("productId", (_, res, next, value) => {
  const id = parseInt(value);
  if (!id) return res.status(400).json({ error: `invalid productId: "${value}"` });
  else next();
});

//Param validation
router.param("userId", (_, res, next, value) => {
  const id = parseInt(value);
  if (!id) return res.status(400).json({ error: `invalid user id: "${value}"` });
  else next();
});

//Param validation
router.param("avaliationId", (_, res, next, value) => {
  const id = parseInt(value);
  if (!id) return res.status(400).json({ error: `invalid user id: "${value}"` });
  else next();
});

// GET all avaliations from a product
router.get(`${endpoint}/:productId`, auth.check_token, function (req, res) {
  const id = parseInt(req.params.productId);
  avaliation
    .getByProduct(id)
    .then((data) => {
      if (data) return res.status(200).json(data);
      return  res.status(404).json({ error: `record ${id} not found` });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Erro ao recuperar avaliação de produto - " + err.message,
      });
    });
});

// GET all avaliations from an user
router.get(`${endpoint}/user/:userId`, auth.check_token, function (req, res) {
  const id = parseInt(req.params.userId);
  avaliation
    .getByUser(id)
    .then((data) => {
      if (data) return res.status(200).json(data);
      return res.status(404).json({ error: `record ${id} not found` });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Erro ao recuperar avaliações de usuário - " + err.message,
      });
    });
});

// GET all avaliations from an user within a product
router.get(`${endpoint}/:userId/:productId`, auth.check_token, function (req, res) {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  avaliation
    .getByUserInProduct(userId, productId)
    .then((data) => {
      if (data) return res.status(200).json(data);
      return res.status(404).json({ error: `record ${id} not found` });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Erro ao recuperar avaliações de usuário em um produto - " + err.message,
      });
    });
});

// POST: Create an avaliation
router.post(endpoint, auth.check_token, auth.check_admin, (req, res) => {
  avaliation.add(req.body).then((data) => {
    if (data) return res.status(201).json(data);
    else return res.status(500).json({ error: `Erro ao inserir avaliação ${req.body}` });
  });
});

// DEL: Delete an avaliation
router.delete(
  `${endpoint}/:avaliationId`,
  auth.check_token,
  (req, res) => {
    const id = parseInt(req.params.avaliationId);
    avaliation
      .del(id)
      .then((_) => {
        return res.status(204).send();
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Erro ao excluir avaliação: " + err.message,
        });
      });
  }
);

// PUT: Update an avaliation
router.put(
  `${endpoint}/:avaliationId`,
  auth.check_token,  
  (req, res) => {
    const id = parseInt(req.params.avaliationId);
    avaliation
      .update(id, req.body)
      .then((count) => {
        if (count >= 1) return res.status(201).json({ updated: count });
        return res.status(404).json({ error: `record ${id} not found` });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao alterar avaliação: " + err.message,
        });
      });
  }
);

module.exports = router;
