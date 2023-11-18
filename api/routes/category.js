/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     StatusOperation:
 *       type: object
 *       properties:
 *         updated:
 *           type: integer
 *           description: Quantidade de recursos atualizados
 *         inserted:
 *           type: integer
 *           description: Quantidade de recursos inseridos
 *       example:
 *         updated: 1
 *
 *     categoria:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the category
 *         nome:
 *           type: string
 *           description: Nome da categoria
 *         descricao:
 *           type: string
 *           description: Descrição da categoria
 *       example:
 *         nome: Condimento
 *         descricao: Misturas criadas indutrialmente.
 *
 * security:
 *   - bearerAuth: []
 *
 * tags:
 *   name: Categorias
 *   description: API de gerenciamento de categorias de produtos
 *
 * /api/categoria:
 *   get:
 *     summary: Retorna a lista de categorias
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: O response com a lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categoria'
 *       401:
 *         description: Acesso não permitido
 *
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: A categoria foi inserida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       401:
 *         description: Invalid token
 *
 *
 * /api/categoria/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo id
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Codigo da categoria
 *     responses:
 *       200:
 *         description: O response da categoria de código solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Resource não encontrado
 *
 *   put:
 *    summary: Atualiza a categoria pelo ID
 *    tags: [Categorias]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Código da categoria
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Categoria'
 *    responses:
 *      200:
 *        description: A categoria inserida ou atualizada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatusOperation'
 *      404:
 *        description: The resource was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove uma categoria a partir do id
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código da categoria
 *     responses:
 *       204:
 *         description: A categoria foi deletada
 *       404:
 *         description: Resource não encontrado
 */


const express = require("express");
let router = express.Router();
const endpoint = "/categoria";
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const Authorization = require("../../authorization");
const Category = require("../../database/category");
const category = new Category();
const auth = new Authorization();

//Param validation
router.param("categoryid", (_, res, next, value) => {
  const id = parseInt(value);
  if (!id) return res.status(400).json({ error: `invalid category id: "${value}"` });
  else next();
});


// GET all categorys
router.get(endpoint, auth.check_token, function (req, res) {
  category
    .get(null, req.query)
    .then((categorias) => res.status(200).json(categorias))
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao recuperar as categorias - " + err.message,
      });
    });
});

// GET the category
router.get(`${endpoint}/:categoryid`, auth.check_token, function (req, res) {
  const id = parseInt(req.params.categoryid);
  category
    .get(id)
    .then((data) => {
      if (data) return res.status(200).json(data);
      return  res.status(404).json({ error: `record ${id} not found` });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Erro ao recuperar a categoria - " + err.message,
      });
    });
});

/*
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
*/

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
