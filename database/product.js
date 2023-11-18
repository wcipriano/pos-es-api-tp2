const dbc = require("./conn"),
  get_query_fields = require("./../api/api_utils"),
  table = "produto";

class Product {
  async get(id, query_string) {
    if (id) return dbc.select("*").from(table).where({ id: id }).first();
    //Filter, Sort and Order
    const qf = get_query_fields(query_string, table);
    return dbc
      .select("*")
      .from(table)
      .where(qf.query)
      .orderBy(qf.sort, qf.order)
      .paginate({ perPage: qf.limit, currentPage: qf.page });
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
