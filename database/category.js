const dbc = require("./conn");
const table_cat = "categoria";
const table_pro = "produto";

class Category {

  async get(id) {
    if (id) return dbc.select("*").from(table_cat).where({ id: id }).first();
    else return dbc.select("*").from(table_cat).orderBy("id");
  }

  async getByCategory(id) {
    if (id) return dbc.select("*").from(table_cat).where({ id: id });
    else return dbc.select("*").from(table_cat).orderBy("id");
  }

  async getByProductInCategory(categoryid) {
    if (categoryid) return dbc.select("*").from(table_pro).where({ categoriaid: categoryid});
    else return dbc.select("*").from(table_pro).orderBy("descricao");
  }

  async add(category) {
    console.log("add category: ", category);
    let data = null;
    await dbc(table_cat)
      .insert(category)
      .returning("*")
      .then(([inserted]) => (data = inserted));
    return data;
  }

  async del(id) {
    console.log("del category: ", id);
    return dbc(table_cat).where({ id: id }).del();
  }

  async update(id, category) {
    const count = await dbc(table_cat)
      .where({ id: id })
      .update({ nome: category.nome || null })
      .update({ descricao: category.descricao || null })
    return count;
  }
}

module.exports = Category;
