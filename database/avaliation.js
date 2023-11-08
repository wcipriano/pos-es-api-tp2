const dbc = require("./conn");
const table = "avaliacao";

class Avaliation {
  async getByProduct(id) {
    if (id) return dbc.select("*").from(table).where({ produtoid: id });
    else return dbc.select("*").from(table).orderBy("texto");
  }

  async getByUser(id) {
    if (id) return dbc.select("*").from(table).where({ usuarioid: id });
    else return dbc.select("*").from(table).orderBy("texto");
  }

  async getByUserInProduct(userId, productId) {
    if (userId && productId) return dbc.select("*").from(table).where({ usuarioid: userId, produtoid: productId });
    else return dbc.select("*").from(table).orderBy("texto");
  }

  async add(avaliation) {
    console.log("add produto: ", avaliation);
    let data = null;
    await dbc(table)
      .insert(avaliation)
      .returning("*")
      .then(([inserted]) => (data = inserted));
    return data;
  }

  async del(id) {
    console.log("del avaliation: ", id);
    return dbc(table).where({ id: id }).del();
  }

  async update(id, avaliation) {
    const count = await dbc(table)
      .where({ id: id })
      .update({ texto: avaliation.texto || null })
      .update({ curtidas: avaliation.curtidas || null })
      .update({ usuarioid: avaliation.usuarioid || null })
      .update({ produtoid: avaliation.produtoid || null })
    return count;
  }
}

module.exports = Avaliation;
