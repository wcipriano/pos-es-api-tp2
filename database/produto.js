const dbc = require("./conn");

class Product {
  async get(id) {
    if (id) return dbc.select("*").from("produto").where({ id: id }).first();
    else return dbc.select("*").from("produto").orderBy("descricao");
  }

  async add(produto) {
    console.log("add produto: ", produto);
    let data = null;
    await dbc("produto")
      .insert(produto)
      .returning("*")
      .then(([inserted]) => (data = inserted));
    return data;
  }

  async del(id) {
    console.log("del produto: ", id);
    return dbc("produto").where({ id: id }).del();
  }
}

module.exports = Product;
