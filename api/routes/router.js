require("dotenv").config();
const express = require("express");
let router = express.Router();
const endpoint = "/produtos";
router.use(express.json());

const Product = require("../../database/produto");
const product = new Product();

//Default routs and param validation
router.param("productId", (req, res, next, value) => {
  const id = parseInt(value);
  if (!id) res.status(400).json({ error: `invalid productId: "${value}"` });
  else next();
});

// GET all products
router.get(endpoint, function (req, res) {
  product
    .get()
    .then((produtos) => res.status(200).json(produtos))
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao recuperar produtos - " + err.message,
      });
    });
});

// GET one product
router.get(endpoint + "/:productId", function (req, res) {
  const id = parseInt(req.params.productId);
  product
    .get(id)
    .then((data) => {
      if (data) res.status(200).json(data);
      else res.status(404).json({ error: `record ${id} not found` });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao recuperar produtos - " + err.message,
      });
    });
});

// POST: Create one product
router.post(endpoint, (req, res) => {
  product.add(req.body).then((data) => {
    if (data) res.status(201).json(data);
    else res.status(500).json({ error: `Erro ao inserir produto ${req.body}` });
  });
});

// DEL: Delete one product
router.delete(endpoint + "/:productId", (req, res) => {
  const id = parseInt(req.params.productId);
  product
    .del(id)
    .then((resp) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao excluir produto: " + err.message,
      });
    });
});

// PUT: Update one product
router.put(endpoint + "/:productId", (req, res) => {
  const id = parseInt(req.params.productId);
  product
    .update(id, req.body)
    .then((count) => {
      if (count >= 1) res.status(201).json({ updated: count });
      else res.status(404).json({ error: `record ${id} not found` });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao alterar produto: " + err.message,
      });
    });
});

module.exports = router;
