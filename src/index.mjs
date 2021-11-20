import ohm from 'ohm-js';
import fs from 'fs';
import path from 'path';

const grammar = fs.readFileSync('./src/grammar.ohm', 'utf-8');

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

  // `INSERT INTO table_name (column1, column2, column3 )
  // VALUES (value1, value2, value3);`,
];

const t = ohm.grammar(grammar);

console.log('-----------------------');
for (const test of tests) {
  console.log('---');
  console.log(test);
  console.log(`--->`, t.match(test).succeeded());
}
