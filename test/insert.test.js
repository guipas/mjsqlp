const grammar = require('../dist/').grammar;
const chai = require('chai');
const { expect } = chai;

const tests = [
  `INSERT INTO test (col, cola, colb ) values ('a', 2, 4, 'c')`,
  `INSERT INTO test (col, cola, colb ) values ('a', 2, 4, 'c');`,
  `INSERT INTO test values ('a', 2, 4, 'c')`,
  `INSERT INTO test (col, cola, colb ) values ('a', 2, 4, 'c')`,
  `INSERT INTO test (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  `INSERT INTO db.test (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  `INSERT INTO \`db test\` (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  `INSERT INTO \`db\`\`test\` (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  `INSERT INTO \`db"test\` (col, cola, colb ) values ('a', 2, 4, 'c'), ('a', 2, 4, 'c')`,
  `INSERT INTO "test" values ('a', 2, 4, 'c')`,
  `INSERT INTO \`test\`.test values ('a', 2, 4, 'c')`,
];


describe('Insert Into', async function () {
  for (const test of tests) {
    it(test, function () {
      const success = grammar.match(test).succeeded();
      expect(success).to.equal(true);
    })
  }
})


