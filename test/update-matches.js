module.exports = {
  title: 'Insert Into',
  tests: [
    `update t1 set c1 = 1 where c2 = 2;`,
    `UPDATE t1 SET col1 = col1 + 1`,
    `UPDATE t1 SET col1 = col1 + 1, col2 = col1`,
    `UPDATE items,month SET items.price=month.price WHERE items.id=month.id`
  ]
};