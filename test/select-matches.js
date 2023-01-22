module.exports = {
  title: 'Select',
  tests: [
    `select * from t1`,
    `SELECT 1 + 1;`,
    `SELECT id, t1.* FROM t1`,
    `SELECT t1.name, t2.salary FROM employee AS t1, info AS t2 WHERE t1.name = t2.name;`,
    `SELECT CONCAT(last_name,', ',first_name) AS full_name FROM mytable ORDER BY full_name;`
  ]
};