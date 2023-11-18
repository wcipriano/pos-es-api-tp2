const fields = {
  produto: new Array("id", "descricao", "valor", "marca", "categoriaid"),
  categoria: new Array("id", "nome", "descricao"),
};

const default_sort_field = {
  produto: "descricao",
  categoria: "nome",
};

const order_options = new Array("asc", "desc");

exports.fields = fields;
exports.default_sort = default_sort_field;
exports.order_options = order_options;
