import ohm from "ohm-js";
import fs from "fs";
import path from "path";

const grammarDefinition = fs.readFileSync("./src/grammar.ohm", "utf-8");

export const grammar = ohm.grammar(grammarDefinition);
export const semantic = grammar.createSemantics();

semantic.addOperation('toTree', {

  Statement: function(node) {
    // console.log(node);
    return node.toTree();
  },
  StatementInsertInto: function(insertInto, tableName, columns, keyworkValues, literalValueListList, coma) {
    // console.log('columns', columns.children);
    return {
      name: 'operation:insert',
      value: {
        tableName: tableName.sourceString,
        columns: columns?.children[0]?.toTree() || null,
        // keyworkValues: keyworkValues,
        rows: literalValueListList.toTree(),
        coma: coma.sourceString === ";",

      }

    };
  },
  identifier(identifier) {
    return identifier.toTree();
  },
  ColumnsList(startParen, list, endParen) {
    return list.toTree();
  },
  identifierUnquoted(body) {
    return {
      name: 'identifier',
      value: body.sourceString
    };
  },


  NonemptyListOf: function(x, _, xs) {
    return [x.toTree()].concat(xs.toTree());  // .myOp can be called on the array-like xs
  },

  LiteralValuesList(startParen, list, endParent) {
    // console.log('LiteralValuesList', list);
    return list.toTree();
  },
  LiteralString(startQuote, str, endQuote) {
    return {
      name: 'value:string',
      value: str.sourceString,
    };
  },
  LiteralNumber(nb) {
    return {
      name: 'value:number',
      value: nb.sourceString,
    };
  },


  _iter(...children) {
    return children.map(c => c.toTree());
  },
  _terminal() {
    console.log('terminal', this.sourceString);
    return this.sourceString;
  }
})