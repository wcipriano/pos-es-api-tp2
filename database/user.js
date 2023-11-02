const dbc = require("./conn");
const table = "usuario";

class User {
  async get(id) {
    if (id) return dbc.select("*").from(table).where({ id: id }).first();
    else return dbc.select("*").from(table).orderBy("id");
  }

  async get_by_login(login) {
    const query = { login: login };
    return dbc.select("*").from(table).where(query).first();
  }

  async add(usuario, phash) {
    console.log("add usuario: ", usuario);
    let data = null;
    await dbc(table)
      .insert({
        nome: usuario.nome,
        login: usuario.login,
        senha: phash,
        email: usuario.email,
      })
      .returning("id")
      .then(([inserted]) => (data = inserted));
    return data;
  }

  async del(id) {
    console.log("del user: ", id);
    return dbc(table).where({ id: id }).del();
  }
}

module.exports = User;
