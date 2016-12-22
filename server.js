var EOL = require('os').EOL
var Koa = require('koa')
var fetch = require('node-fetch')
var send = require('koa-send')

var app = new Koa()

async function getWordlist () {
  var response = await fetch('https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt')
  return response.text()
}

function parseWordlist (wordlist) {
  return wordlist.split(EOL).reduce((memo, line) => {
    var [, number, word] = line.match(/^([1-6]{5})\s+(\S+)$/) || []
    if (number && word) memo[number] = word
    return memo
  }, {})
}

app.use(async context => {
  if (context.path === '/wordlist') {
    context.body = parseWordlist(await getWordlist())
  } else {
    await send(context, 'index.html')
  }
})

app.listen(3000)
