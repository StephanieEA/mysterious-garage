const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Mysterious garage'
app.locals.items = [
  { id: 1,
  name: 'Hubcap',
  reason: 'Future mixed media project',
  cleanliness: 'Rancid'
  },
  { id: 2,
   name: 'Curtains',
   reason: 'Cool pattern',
   cleanliness: 'Dusty'
  }
]

app.get('/', (request, response) => {
  response.send(app.locals.items)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
