"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grammar = void 0;
const ohm_js_1 = __importDefault(require("ohm-js"));
const fs_1 = __importDefault(require("fs"));
const grammarDefinition = fs_1.default.readFileSync('./src/grammar.ohm', 'utf-8');
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
exports.grammar = ohm_js_1.default.grammar(grammarDefinition);
console.log('-----------------------');
for (const test of tests) {
    console.log('---');
    console.log(test);
    console.log(`--->`, exports.grammar.match(test).succeeded());
}
