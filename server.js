const express = require('express')
const app = express()

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

app.get('/', (request, response) => {
  response.send(app.locals.items)
})

app.get('/items/:id', (request, response) => {
  const { id } = request.params
  const item = app.locals.items.find(item => item.id === id)

  if (!item) return response.sendStatus(404)
  response.send(item)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
