const get_query_fields = require("../api/api_utils");
const dbc = require("./conn");
const table = "avaliacao";

class Avaliation {
  async getByProduct(id, query_string) {
    const qf = get_query_fields(query_string, table);
    if (id) return dbc.select("*").from(table).where({ produtoid: id });
    return dbc
      .select("*")
      .from(table)
      .where(qf.query)
      .orderBy(qf.sort, qf.order);
  }

  async getByUser(id, query_string) {
    const qf = get_query_fields(query_string, table);
    if (id) return dbc.select("*").from(table).where({ usuarioid: id });
    return dbc
      .select("*")
      .from(table)
      .where(qf.query)
      .orderBy(qf.sort, qf.order);
  }

  async getByUserInProduct(userId, productId, query_string) {
    const qf = get_query_fields(query_string, table);
    if (userId && productId)
      return dbc
        .select("*")
        .from(table)
        .where({ usuarioid: userId, produtoid: productId });
    return dbc
      .select("*")
      .from(table)
      .where(qf.query)
      .orderBy(qf.sort, qf.order);
  }

  async add(avaliation) {
    let data = null;
    await dbc(table)
      .insert(avaliation)
      .returning("*")
      .then(([inserted]) => (data = inserted));
    return data;
  }

  async del(id) {
    return dbc(table).where({ id: id }).del();
  }

  async update(id, avaliation) {
    const count = await dbc(table)
      .where({ id: id })
      .update({ texto: avaliation.texto || null })
      .update({ curtidas: avaliation.curtidas || null })
      .update({ usuarioid: avaliation.usuarioid || null })
      .update({ produtoid: avaliation.produtoid || null });
    return count;
  }
}

module.exports = Avaliation;
