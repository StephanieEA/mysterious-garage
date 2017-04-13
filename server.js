const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Mysterious garage'
app.locals.items = [
  { id: '1',
  name: 'Hubcap',
  reason: 'Future mixed media project',
  cleanliness: 'Rancid'
  },
  { id: '2',
   name: 'Curtains',
   reason: 'Cool pattern',
   cleanliness: 'Dusty'
  }
]

app.get('/items', (request, response) => {
  response.json(app.locals.items)
})

app.get('/items/:id', (request, response) => {
  const { id } = request.params
  const item = app.locals.items.find(item => item.id === id)

  if (!item) return response.sendStatus(404)
  response.json(item)
})

app.post('/items', (request, response) => {
  const { name, reason, cleanliness } = request.body
  const id = Date.now()

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

  let item = app.locals.items.find(item => item.id === id)

  item.name = name
  item.reason = reason
  item.cleanliness = cleanliness

  if(!item) { return response.sendStatus(404) }
  response.json(item)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
