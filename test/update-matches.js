module.exports = {
  title: 'Update',
  tests: [
    `update t1 set c1 = 1 where c2 = 2;`,
    `UPDATE t1 SET col1 = col1 + 1`,
    `UPDATE t1 SET col1 = col1 + 1, col2 = col1`,
    `UPDATE items,month SET items.price=month.price WHERE items.id=month.id`,
    `UPDATE films SET kind = 'Dramatic' WHERE kind = 'Drama';`,
    `UPDATE weather SET temp_lo = temp_lo+1, temp_hi = temp_lo+15, prcp = DEFAULT WHERE city = 'San Francisco' AND date = '2003-07-03';`,
    // `UPDATE weather SET (temp_lo, temp_hi, prcp) = (temp_lo+1, temp_lo+15, DEFAULT) WHERE city = 'San Francisco' AND date = '2003-07-03';`
  ]
};