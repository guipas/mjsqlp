const grammar = require('../dist/').grammar;
const semantic = require('../dist/').semantic;
const chai = require('chai');
const { expect } = chai;

const insertTests = require('./inserts-matches.js');
const updateTests = require('./update-matches.js');

const testSuites = [].concat(insertTests, updateTests);

for (const suite of testSuites) {
  describe(suite.title, async function() {
    for (const test of suite.tests) {
      const testType = typeof test === 'string' ? 'simple' : 'complete';
      const sql = testType === 'simple' ? test : test.sql;
      const targetAST = testType === 'simple' ? null : test.targetAST;
      const shouldMatch = testType === 'simple' ? true : typeof test.shouldMatch === 'undefined' ? true : test.shouldMatch;
      const testLabel = testType === 'simple' ? `Command is ${shouldMatch ? 'valid' : 'invalid'}: ${sql}` : `Command has correct AST: ${sql}`;
      it(testLabel, function() {
        const result = grammar.match(test)
        const success = result.succeeded();

        if (targetAST) {
          const node = semantic(result);
          // console.log('result:', JSON.stringify(node.toTree(), null, 2));
          expect(node).to.deep.equal(targetAST);
        }

        if (shouldMatch !== success) {
          console.log('result', result)
        }
        expect(success).to.equal(shouldMatch);
      })
    }
  })
}