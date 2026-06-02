import { execSync } from "child_process";
import fs from "fs";
execSync("tish build src/js-entry.tish -o dist/index.js --target js", { stdio: 'inherit' });
fs.appendFileSync("dist/index.js", "\nexport { tw, getUtilities };\n");
