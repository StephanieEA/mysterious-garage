const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const fs = require('fs')
const app = express()

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Mysterious garage'
app.locals.items = [
  { id: '1',
  name: 'Hubcap',
  reason: 'Future mixed media project',
  cleanliness: {
                Sparkling: true,
                Dusty: false,
                Rancid: false
                }
  },
  { id: '2',
   name: 'Curtains',
   reason: 'Cool pattern',
   cleanliness: {
                 Sparkling: false,
                 Dusty: true,
                 Rancid: false
                 }
  },
  { id: '3',
   name: 'Batman',
   reason: 'sentimental',
   cleanliness: {
                 Sparkling: false,
                 Dusty: true,
                 Rancid: false
                 }
  }
]

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/items', (request, response) => {
  response.status(200).json(app.locals.items)
})

app.get('/items/:id', (request, response) => {
  const { id } = request.params
  const item = app.locals.items.find(item => item.id === id)

  if (!item) return response.sendStatus(404)
  response.status(200).json(item)
})

app.post('/items', (request, response) => {
  const { name, reason, cleanliness } = request.body
  const id = JSON.stringify(Date.now())

  if (!name || !reason || !cleanliness) {
    return response.status(422).send({
      error: 'All item properties are not provided'
    })
  }

  app.locals.items.push({ id, name, reason, cleanliness })
  response.status(201).json({ id, name, reason, cleanliness })
})


app.put('/items/:id', (request, response) => {
  const { id } = request.params
  const { name, reason, cleanliness } = request.body

  const item = app.locals.items.find(item => item.id === id)

  if (name) item.name = name
  if (reason) item.reason = reason
  if (cleanliness) item.cleanliness = cleanliness

  if(!item) response.status(404)

  response.status(200).json(item)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
