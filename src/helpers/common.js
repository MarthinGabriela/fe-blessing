export const Common = {
    URL: {
        baseUrl: "https://tb-blessing-db-production.up.railway.app/api/v1",
        // baseUrl: "http://localhost:2020/api/v1",
        barang: "/barang",
        login: "/login"
    },
}

export function currencyFormatting(value) {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function getDateFormat(epochTime) {
  const date = new Date(epochTime);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export function flatten(params) {
    params.columns.forEach(function (column, index) {
      params['columns[' + index + '].data'] = column.data;
      params['columns[' + index + '].name'] = column.name;
      params['columns[' + index + '].searchable'] = column.searchable;
      params['columns[' + index + '].orderable'] = column.orderable;
      params['columns[' + index + '].search.regex'] = column.search.regex;
      params['columns[' + index + '].search.value'] = column.search.value;
    });
    delete params.columns;
  
    params.order.forEach(function (order, index) {
      params['order[' + index + '].column'] = order.column;
      params['order[' + index + '].dir'] = order.dir;
    });
    delete params.order;
  
    params['search.regex'] = params.search.regex;
    params['search.value'] = params.search.value;
    delete params.search;
  
    return params;
  }