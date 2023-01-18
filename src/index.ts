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
      type: 'statement',
      name: 'insertInto',
      columns: columns?.children[0]?.toTree() || null,
      tableName: tableName.toTree(),
      values: literalValueListList.toTree(),
      coma: coma.sourceString === ";",
    };
  },
  tableName(dbNameOrTableName, dot, tableName) {
    // console.log(dbNameOrTableName.sourceString, dot.sourceString, tableName.sourceString);
    return [dbNameOrTableName.toTree(), tableName.toTree()?.[0]].filter(n => n);
  
  },
  identifier(identifier) {
    return identifier.toTree();
  },
  ColumnsList(startParen, list, endParen) {
    return list.toTree();
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
    // console.log('LiteralValuesList', list);
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