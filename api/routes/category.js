require("dotenv").config();
const express = require("express");

let router = express.Router();
router.use(express.json());

const endpoint = "/categoria";

const Authorization = require("../../authorization");
const category = require("../../database/category");
const category = new category();
const auth = new Authorization();

//Param validation
router.param("nome", (_, res, next, value) => {
  const nome = value;
  if (!nome) return res.status(400).json({ error: `invalid name: "${value}"` });
  else next();
});

//Param validation
router.param("categoryid", (_, res, next, value) => {
  const id = parseInt(value);
  if (!id) return res.status(400).json({ error: `invalid category id: "${value}"` });
  else next();
});


// GET all categorys
router.get(endpoint, auth.check_token, function (req, res) {
  category
    .get()
    .then((categorias) => res.status(200).json(categorias))
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao recuperar as categorias - " + err.message,
      });
    });
});

// GET the category
router.get(`${endpoint}/:nome`, auth.check_token, function (req, res) {
  const nome = req.params.categoryid;
  category
    .getByCategory(nome)
    .then((data) => {
      if (data) return res.status(200).json(data);
      return  res.status(404).json({ error: `record ${nome} not found` });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Erro ao recuperar a categoria - " + err.message,
      });
    });
});


// GET all the products from a category
router.get(`${endpoint}/:categoryid`, auth.check_token, function (req, res) {
  const id = parseInt(req.params.categoryid);
  category
    .getByProductInCategory(id)
    .then((data) => {
      if (data) return res.status(200).json(data);
      return  res.status(404).json({ error: `record ${id} not found` });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Erro ao recuperar os produtos da categoria - " + err.message,
      });
    });
});


// POST: Create an category
router.post(endpoint, auth.check_token, auth.check_admin, (req, res) => {
  category.add(req.body).then((data) => {
    if (data) return res.status(201).json(data);
    else return res.status(500).json({ error: `Erro ao inserir a categoria ${req.body}` });
  });
});

// DEL: Delete an category
router.delete(
  `${endpoint}/:categoryId`,
  auth.check_token,
  (req, res) => {
    const id = parseInt(req.params.categoryId);
    category
      .del(id)
      .then((_) => {
        return res.status(204).send();
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Erro ao excluir categoria: " + err.message,
        });
      });
  }
);

// PUT: Update an category
router.put(
  `${endpoint}/:categoryId`,
  auth.check_token,  
  (req, res) => {
    const id = parseInt(req.params.categoryId);
    category
      .update(id, req.body)
      .then((count) => {
        if (count >= 1) return res.status(201).json({ updated: count });
        return res.status(404).json({ error: `record ${id} not found` });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao alterar categoria: " + err.message,
        });
      });
  }
);

module.exports = router;
