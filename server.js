var Koa = require('koa')
var fetch = require('node-fetch')
var send = require('koa-send')

var app = new Koa()

async function getWordlist () {
  var response = await fetch('https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt')
  return response.text()
}

app.use(async context => {
  if (context.path === '/wordlist') {
    context.body = await getWordlist()
  } else {
    await send(context, 'index.html')
  }
})

app.listen(3000)
