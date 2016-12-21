var Koa = require('koa')
var fetch = require('node-fetch')
var send = require('koa-send')

var app = new Koa()

app.use(context => {
  if (context.path === '/wordlist') {
    return fetch('https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt')
      .then(response => response.text())
      .then(result => { context.body = result })
  } else {
    return send(context, 'index.html')
  }
})

app.listen(3000)
