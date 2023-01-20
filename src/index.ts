import ohm from "ohm-js";
import fs from "fs";
import path from "path";

const grammarDefinition = fs.readFileSync("./src/grammar.ohm", "utf-8");

export const grammar = ohm.grammar(grammarDefinition);
export const semantic = grammar.createSemantics();

semantic.addOperation('toTree', {

  Statement: function(node) {
    return node.toTree();
  },
  CommandInsertInto: function(insertInto, tableName, columns, keyworkValues, literalValueListList, coma) {
    return {
      type: 'statement',
      name: 'insertInto',
      columns: columns?.children[0]?.toTree() || null,
      tableName: tableName.toTree(),
      values: literalValueListList.toTree(),
      endComa: coma.sourceString === ";",
    };
  },

  identifier(dbNameOrTableName, dot, tableName) {
    return [dbNameOrTableName.toTree(), tableName.toTree()?.[0]].filter(n => n);
  },
  ColumnsList(startParen, list, endParen) {
    return list.toTree();
  },

  
  identifierPart(identifier) {
    return identifier.toTree();
  },
  identifierUnquoted(body) {
    return {
      type: 'identifier',
      name: 'unquotedIdentifier',
      value: body.sourceString
    };
  },
  identifierQuotedTild(startTild, spaces1, body, spaces2, endTild) {
    return {
      type: 'identifier',
      name: 'quotedIdentifier',
      value: spaces1.sourceString + body.sourceString + spaces2.sourceString,
    };
  
  },




  ValueList(startParen, list, endParent) {
    return {
      type: 'ValueList',
      values: list.toTree()
    };
  },
  LiteralString(startQuote, str, endQuote) {
    return {
      type: 'Literal',
      name: 'string',
      value: str.sourceString,
    };
  },
  LiteralNumber(nb) {
    return {
      type: 'Literal',
      name: 'number',
      value: nb.sourceString,
    };
  },


  NonemptyListOf: function(x, _, xs) {
    return [x.toTree()].concat(xs.toTree());
  },
  _iter(...children) {
    return children.map(c => c.toTree());
  },
  _terminal() {
    console.log('terminal', this.sourceString);
    return this.sourceString;
  }
})