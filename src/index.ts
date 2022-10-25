import ohm from "ohm-js";
import fs from "fs";
import path from "path";

const grammarDefinition = fs.readFileSync("./src/grammar.ohm", "utf-8");

export const grammar = ohm.grammar(grammarDefinition);
