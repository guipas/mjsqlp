const grammar = require('../dist/').grammar;
const semantic = require('../dist/').semantic;
const chai = require('chai');
const { expect } = chai;

const tests = [
  // `INSERT INTO test (col, cola, colb) values ('a', 2, 4, 'c')`,
  // `INSERT INTO test (a, b1, c2) values ('abc', 222, 444, 'cccc')`,
  // `INSERT INTO test (col_1, col_2, col_3 ) values ('a', 2, 4, 'c')`,
  // `INSERT INTO test_a (col, cola, colb ) values ('a', 2, 4, 'c')`,
  // `INSERT INTO $test (col, cola, colb ) values ('a', 2, 4, 'c')`,
  // `INSERT INTO test10 (col1, col2, col3 ) values ('a', 2, 4, 'c')`,
  // `INSERT INTO test (col, cola, colb ) values ('a', 2, 4, 'c');`,
  `INSERT INTO test values (1, 'abc', 2, 4, 'c')`,
  // `INSERT INTO test (col, cola, colb ) values ('a', 2, 4, 'c')`,
  // `INSERT INTO test (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  // `INSERT INTO db.test (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  // `INSERT INTO \`db test\` (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  // `INSERT INTO \`db _test\` (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  // `INSERT INTO \`db\`\`test\` (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  // `INSERT INTO \`db"test\` (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  // `INSERT INTO "test" values ('a', 2, 4, 'c')`,
  // `INSERT INTO "test_1" values ('a', 2, 4, 'c')`,
  // `INSERT INTO \`test$\`.test values ('a', 2, 4, 'c')`,
];


describe('Insert Into', async function() {
  for (const test of tests) {
    it(test, function() {
      const result = grammar.match(test)
      const success = result.succeeded();
      const node = semantic(result);
      console.log('result:', JSON.stringify(node.toTree(), null, 2));
      expect(success).to.equal(true);
    })
  }
})


