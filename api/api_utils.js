const { fields, default_sort, order_options } = require("../database/db_util");

function get_query_fields(query_string, table) {
  let sort = query_string._sort;
  let order = query_string._order;
  if (fields[table].indexOf(sort) == -1) sort = default_sort[table];
  if (order_options.indexOf(order) == -1) order = "asc";

  //Fields
  query = Object();
  Object.keys(query_string).forEach((key) => {
    if (fields[table].indexOf(key) != -1) {
      query[key] = query_string[key];
    }
  });

  return { sort: sort, order: order, query: query };
}

module.exports = get_query_fields;
