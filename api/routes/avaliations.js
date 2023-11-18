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
 *     avaliacao:
 *       type: object
 *       required:
 *         - usuarioid
 *         - produtoid
 *         - texto
 *         - curtidas
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the category
 *         usuarioid:
 *           type: integer
 *           description: Usuario que escreveu o comentário
 *         produtoid:
 *           type: integer
 *           description: Produto que recebeu o comentário
 *         texto:
 *           type: string
 *           description: Comentário
 *         curtidas:
 *           type: integer
 *           description: Quantia de curtidas maior que 0
 *       example:
 *         usuarioid: 1
 *         produtoid: 3
 *         texto: Perfeitas condições
 *         curtidas: 1
 *
 * security:
 *   - bearerAuth: []
 *
 * tags:
 *   name: Avaliacoes
 *   description: API de gerenciamento de avaliações de produtos
 *
 * /api/avaliacao/{productId}:
 *   get:
 *     summary: Retorna a lista de avaliacoes em um produto
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do produto
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: O response com a lista de avaliacoes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/avaliacao'
 *       401:
 *         description: Acesso não permitido
 * /api/avaliacao/user/{userId}:
 *   get:
 *     summary: Retorna a lista de avaliacoes de um usuario
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: O response com a lista de avaliacoes de um usuároo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/avaliacao'
 *       401:
 *         description: Acesso não permitido
 *
 * /api/avaliacao/{userId}/{productId}:
 *   get:
 *     summary: Retorna a lista de avaliacoes de um usuario em determinado produto
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: integer
 *         required: true
 *         description: Código do usuário
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do produto
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: O response com a lista de avaliacoes de um usuároo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/avaliacao'
 *       401:
 *         description: Acesso não permitido
 * /api/avaliacao:
 *   post:
 *     summary: Cria uma nova avaliacao
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: integer
 *         required: true
 *         description: Código do usuário
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/avaliacao'
 *     responses:
 *       200:
 *         description: A avaliacao foi inserida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/avaliacao'
 *       401:
 *         description: Invalid token
 * /api/avaliacao/{avaliationId}:
 *   put:
 *    summary: Atualiza uma avaliacao pelo ID
 *    tags: [Avaliacoes]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Código da avaliacao
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/avaliacao'
 *    responses:
 *      200:
 *        description: A avaliacao foi inserida ou atualizada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatusOperation'
 *      404:
 *        description: The resource was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove uma avaliacao a partir do id
 *     tags: [Avaliacoes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código da avaliacao
 *     responses:
 *       204:
 *         description: A avaliacao foi deletada
 *       404:
 *         description: Resource não encontrado
 */

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
    .getByProduct(id, req.query)
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
    .getByUser(id, req.query)
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
    .getByUserInProduct(userId, productId, req.query)
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
