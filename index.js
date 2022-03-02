const shell = require('shelljs');

const addParams = process.argv;
let file = '';
if (addParams[2] === 'run' && addParams[3]) {
    file += addParams[3];
}
shell.exec(`npx mocha --timeout=90000 ${file}`)