const StatePagination = {};
StatePagination.generatePagination = async (totalPage, countSelect) => {
  let rows = [];
  for (let i = 1; i <= totalPage; i++) {
    rows.push(i);
  }
  let totalItems = [];
  for (let x = 1; x <= countSelect; x++) {
    if (x % 5 === 0) {
      totalItems.push(x);
    }
  }
  return { totalItems, rows };
};

export { StatePagination };
