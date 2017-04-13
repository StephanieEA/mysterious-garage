const Storage = function () {
  this.garageDoor = $('.toggle-garage')
  this.garage = $('.garage')
  this.nameInput = $('.name-input')
  this.reasonInput = $('.reason-input')
  this.cleanlinessInput = $('.cleanliness-input')
  this.submitItemButton = $('.submit-item-button')
  this.showItems = $('.show-items')
  return this
}

Storage.prototype.loadItems = () => {
  fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(response => {
      response.forEach(item => {
        storage.renderItem(item)
      })
    })
}

Storage.prototype.addItem = (name, reason, cleanliness) => {
  fetch(`http://localhost:3000/items`,
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        reason: reason,
        cleanliness: cleanliness
      })
    })
    .then(response => response.json())
    .then(response => {
      storage.renderItem(response)
      })
}

Storage.prototype.renderItem = (response) => {
  storage.showItems.append(`
      <article id="${response.id}"
        class="response-article">
        <h2>${response.name}</h2>
        <p>${response.reason}</p>
        <p>${response.cleanliness}</p>
      </article>
      `)
}

const storage = new Storage

storage.submitItemButton.on('click', (e) => {
  e.preventDefault()
  storage.addItem(storage.nameInput.val(), storage.reasonInput.val(), storage.cleanlinessInput.val())
})

storage.garageDoor.on('click', () => {
  storage.garage.show()
})


$(() => {
  storage.garage.hide()
  storage.loadItems()
})
