const fs = require('fs')

const exp = require('express')
const app = exp()

const dot = require('dot')

const html = fs.readFileSync('hello.html', 'utf8')
const helloTemplate = dot.template(html)

app.get('/', (req, res) => {
  const tagline = 'ITS A TAGLINE OK'

  let helloHtml = helloTemplate({ TAG: tagline })

  res.send(helloHtml)
})

app.listen(process.env.PORT, () => {
  console.info(`GAE_INSTANCE         : ${process.env.GAE_INSTANCE}
GAE_MEMORY_MB        : ${process.env.GAE_MEMORY_MB}
GAE_SERVICE          : ${process.env.GAE_SERVICE}
GAE_VERSION          : ${process.env.GAE_VERSION}
GOOGLE_CLOUD_PROJECT : ${process.env.GOOGLE_CLOUD_PROJECT}
NODE_ENV             : ${process.env.NODE_ENV}
PORT                 : ${process.env.PORT}
`)
  console.info(`listening at http://localhost:${process.env.PORT}`)
})
