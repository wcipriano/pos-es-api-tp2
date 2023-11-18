const fields = {
  produto: new Array("id", "descricao", "valor", "marca", "categoriaid"),
  categoria: new Array("id", "nome", "descricao"),
  avaliacao: new Array("id", "usuarioid", "produtoid", "texto", "curtidas"),
};

const default_sort_field = {
  produto: "descricao",
  categoria: "nome",
  avaliacao: "curtidas",
};

const order_options = new Array("asc", "desc");

exports.fields = fields;
exports.default_sort = default_sort_field;
exports.order_options = order_options;
