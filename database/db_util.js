const fields = {
  produto: new Array("id", "descricao", "valor", "marca", "categoriaid"),
};

const default_sort_field = {
  produto: "descricao",
};

const order_options = new Array("asc", "desc");

exports.fields = fields;
exports.default_sort = default_sort_field;
exports.order_options = order_options;
