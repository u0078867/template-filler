let args = require('args');
let fs = require('fs');
let path = require('path');
let mustache = require('mustache');


path.join(__dirname, 'package.json'); // for pkg to embed assets

const flags = args.parse(process.argv);

let argv = process.argv.slice(2);

let template = fs.readFileSync(argv[0], 'utf8');
let data = JSON.parse(fs.readFileSync(argv[1], 'utf8'));

var output = mustache.render(template, data);
mustache.tags = ['%7B%7B', '%7D%7D'];
output = mustache.render(output, data);

fs.writeFileSync(argv[2], output);
