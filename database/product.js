const dbc = require("./conn");
const { fields, order_options } = require("./db_util");
const table = "produto";

class Product {
  async get(id, sort, order) {
    if (id) return dbc.select("*").from(table).where({ id: id }).first();
    if (order && order_options.indexOf(order) == -1) order = "asc";
    if (sort && fields.produto.indexOf(sort) == -1) sort = "descricao";
    return dbc.select("*").from(table).orderBy(sort, order);
  }

  async add(produto) {
    console.log("add produto: ", produto);
    let data = null;
    await dbc(table)
      .insert(produto)
      .returning("*")
      .then(([inserted]) => (data = inserted));
    return data;
  }

  async del(id) {
    console.log("del produto: ", id);
    return dbc(table).where({ id: id }).del();
  }

  async update(id, produto) {
    //PUT: Creates a new resource or replaces the whole resource of the target
    //@TODO: here we are not creating new if the target not exists
    const count = await dbc(table)
      .where({ id: id })
      .update({ descricao: produto.descricao || null })
      .update({ marca: produto.marca || null })
      .update({ valor: produto.valor || null });
    return count;
  }
}

module.exports = Product;
