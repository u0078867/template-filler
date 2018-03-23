let args = require('args');
let fs = require('fs');
let path = require('path');
let mustache = require('mustache');
let sprintf = require('sprintf-js').sprintf;


path.join(__dirname, 'package.json'); // for pkg to embed assets

const flags = args.parse(process.argv);

let argv = process.argv.slice(2);

// pre-parse template
let sections = {};
let template = fs.readFileSync(argv[0], 'utf8');
let tokens = mustache.parse(template);

function addFunctionsFromTokensTree(tokens) {
  if (!tokens) return;
  for (let token of tokens) {
    if (token[0] == '#') {
      let section = token[1];
      let s = section.split('_');
      addFunctionsFromTokensTree(token[4]);
      switch (s[0]) {
        case 'fmt':
          sections[section] = function() {
            return function(placeholder, render) {
              let value = render(placeholder);
              let text = sprintf(s[1].replace(',', '.'), value);
              return text;
            }
          }
          break;
        case 'mul':
          sections[section] = function() {
            return function(placeholder, render) {
              let value = render(placeholder);
              let newValue = parseFloat(s[1]) * value;
              return newValue;
            }
          }
          break;
      }
    }
  }
}

addFunctionsFromTokensTree(tokens);
mustache.clearCache();

// create data
let data = Object.assign({}, sections);
let dataPathStat = fs.lstatSync(argv[1]);
if (dataPathStat.isFile()) {
  data = Object.assign(data, JSON.parse(fs.readFileSync(argv[1], 'utf8')));
} else if (dataPathStat.isDirectory()) {
  let dataFolder = argv[1];
  let files = fs.readdirSync(dataFolder).filter(e => path.extname(e).toLowerCase() === '.json');
  if (files.length == 1) {
    data = Object.assign(data, JSON.parse(fs.readFileSync(path.join(dataFolder, files[0]), 'utf8')));
  }
  for (let file of files) {
    fileData = JSON.parse(fs.readFileSync(path.join(dataFolder, file), 'utf8'));
    data[path.parse(file).name] = fileData;
  }
}

// render template
var output = mustache.render(template, data);
mustache.tags = ['%7B%7B', '%7D%7D'];
output = mustache.render(output, data);

fs.writeFileSync(argv[2], output);
