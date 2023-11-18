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
 *     Produto:
 *       type: object
 *       required:
 *         - descricao
 *         - valor
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         descricao:
 *           type: string
 *           description: Nome do produto
 *         valor:
 *           type: number
 *           description: valor do produto
 *         marca:
 *           type: string
 *           description: Marca do produto
 *         categoriaid:
 *           type: integer
 *           description: Código da categoria do produto
 *       example:
 *         descricao: Batata Palha 333gr
 *         valor: 6.01
 *         marca: Elma Chips
 *         categoriaid: 5
 *
 * security:
 *   - bearerAuth: []
 *
 * tags:
 *   name: Produtos
 *   description: API de gerenciamento de produtos
 *
 * /api/produtos:
 *   get:
 *     summary: Retorna a lista de itens
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: O response com a lista de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       401:
 *         description: Acesso não permitido
 *
 *   post:
 *     summary: Cria um novo item
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: O item inserido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       401:
 *         description: Invalid token
 *
 *
 * /api/produtos/{id}:
 *   get:
 *     summary: Retorna um item pelo id
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do item
 *     responses:
 *       200:
 *         description: O response do item de código solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Resource não encontrado
 *
 *   put:
 *    summary: Atualiza os dados de um item pelo ID
 *    tags: [Produtos]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Código do item
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Produto'
 *    responses:
 *      200:
 *        description: A quantidade de itens inseridos ou atualizados
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatusOperation'
 *      404:
 *        description: The resource was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove um item a partir do id
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do item
 *     responses:
 *       204:
 *         description: O item foi deletado
 *       404:
 *         description: Resource não encontrado
 */

const express = require("express");
let router = express.Router();
const endpoint = "/produtos";
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

const Product = require("../../database/product");
const Authorization = require("../../authorization");
const product = new Product();
const auth = new Authorization();

//Default routs and param validation
router.param("productId", (req, res, next, value) => {
  const id = parseInt(value);
  if (!id) res.status(400).json({ error: `invalid productId: "${value}"` });
  else next();
});

// GET all products
router.get(endpoint, auth.check_token, function (req, res) {
  product
    .get(null, req.query)
    .then((produtos) => res.status(200).json(produtos))
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao recuperar produtos - " + err.message,
      });
    });
});

// GET one product
router.get(endpoint + "/:productId", auth.check_token, function (req, res) {
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
router.post(endpoint, auth.check_token, auth.check_admin, (req, res) => {
  product.add(req.body).then((data) => {
    if (data) res.status(201).json(data);
    else res.status(500).json({ error: `Erro ao inserir produto ${req.body}` });
  });
});

// DEL: Delete one product
router.delete(
  endpoint + "/:productId",
  auth.check_token,
  auth.check_admin,
  (req, res) => {
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
  }
);

// PUT: Update one product
router.put(
  endpoint + "/:productId",
  auth.check_token,
  auth.check_admin,
  (req, res) => {
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
  }
);

module.exports = router;
