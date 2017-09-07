//require("babel-register")

const fs = require('fs')
const jsdom = require('jsdom')
const virtualConsole = new jsdom.VirtualConsole()
virtualConsole.sendTo(console)

const vuejs = process.env.NODE_ENV == 'production' ? 'vue.min.js' : 'vue.js'

const dom = new jsdom.JSDOM(fs.readFileSync('src/index.html'), { runScripts: "outside-only" })
dom.window.document.querySelector('#vuejs').src = vuejs

//global.window = dom.window
//global.document = dom.window.document
//require('./src/main.js')

const Script = require('vm').Script
dom.runVMScript(new Script(fs.readFileSync('node_modules/vue/dist/' + vuejs)))
dom.runVMScript(new Script(fs.readFileSync('src/main.js')))

// https://ssr.vuejs.org/en/hydration.html
var node = dom.window.document.querySelector('#app')
if (node.getAttribute('data-server-rendered') != 'true') {
  node.setAttribute('data-server-rendered', 'true')
}

//console.log(dom.serialize())

fs.writeFileSync('dist/index.html', dom.serialize())
fs.writeFileSync('dist/' + vuejs, fs.readFileSync('node_modules/vue/dist/' + vuejs))
fs.writeFileSync('dist/main.js', fs.readFileSync('src/main.js'))
