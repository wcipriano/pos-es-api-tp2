const dbc = require("./conn"),
get_query_fields = require("./../api/api_utils"),
table = "categoria";

class Category {

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

/*
  async getByProductInCategory(categoryid) {
    if (categoryid) return dbc.select("*").from(table_pro).where({ categoriaid: categoryid});
    else return dbc.select("*").from(table_pro).orderBy("descricao");
  }
*/
  async add(category) {
    console.log("add category: ", category);
    let data = null;
    await dbc(table)
      .insert(category)
      .returning("*")
      .then(([inserted]) => (data = inserted));
    return data;
  }

  async del(id) {
    console.log("del category: ", id);
    return dbc(table).where({ id: id }).del();
  }

  async update(id, category) {
    const count = await dbc(table)
      .where({ id: id })
      .update({ nome: category.nome || null })
      .update({ descricao: category.descricao || null })
    return count;
  }
}

module.exports = Category;
