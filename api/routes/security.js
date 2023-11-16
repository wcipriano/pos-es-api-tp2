const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const endpoint = "/security";
const User = require("../../database/user");
const Authorization = require("../../authorization");

router.use(express.json());
const user = new User();
const auth = new Authorization();

//Default routs and param validation
router.param("userId", (req, res, next, value) => {
  const id = parseInt(value);
  if (!id) res.status(400).json({ error: `invalid userId: "${value}"` });
  else next();
});

// GET all users
router.get(endpoint, auth.check_token, auth.check_admin, function (req, res) {
  user
    .get()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao recuperar usuarios: " + err.message,
      });
    });
});

// POST Create new user
router.post(
  endpoint + "/register",
  auth.check_token,
  auth.check_admin,
  function (req, res) {
    const phash = bcrypt.hashSync(req.body.senha, 8);
    user.add(req.body, phash).then((data) => {
      if (data) res.status(201).json(data);
      else
        res.status(500).json({ error: `Erro ao inserir usuario ${req.body}` });
    });
  }
);

// POST Login
router.post(endpoint + "/login", function (req, res) {
  user
    .get_by_login(req.body.login)
    .then((dbuser) => {
      if (dbuser) {
        const checkSenha = bcrypt.compareSync(req.body.senha, dbuser.senha);
        if (checkSenha) {
          const user_data = { id: dbuser.id, roles: dbuser.roles };
          const tokenJWT = auth.get_jwt_token(user_data);
          delete dbuser.senha;
          dbuser.token = tokenJWT;
          return res.status(200).json(dbuser);
        }
      }
      return res.status(200).json({ message: "Login ou senha incorretos" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erro ao efetuar login: " + err.message,
      });
    });
});

// DEL: Delete a user
router.delete(
  endpoint + "/:userId",
  auth.check_token,
  auth.check_admin,
  (req, res) => {
    const id = parseInt(req.params.userId);
    user
      .del(id)
      .then((resp) => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).json({
          message: "Erro ao excluir usuario: " + err.message,
        });
      });
  }
);

module.exports = router;
