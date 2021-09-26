var fs = require('fs');
var postcss = require('postcss');

var mediaVariables = require('postcss-media-variables');

var mycss = fs.readFileSync('./public/style.css', 'utf8');

// Process your CSS
var output = postcss()
    .use(mediaVariables()) // first run
    .use(mediaVariables()) // second run
    .process(mycss, { /* postcss - options */ })
    .css;

console.log(output);