var shell = require('shelljs');
shell.cp('-Rf','src/public/', "dist/");
shell.cp('-Rf','.env', "dist/");