const Storage = function () {
  this.garageDoor = $('.toggle-garage')
  this.garage = $('.garage')
  this.nameInput = $('.name-input')
  this.reasonInput = $('.reason-input')
  this.cleanlinessInput = $('.cleanliness')
  this.submitItemButton = $('.submit-item-button')
  this.showItems = $('.show-items')
  this.updateCleanliness = $('.update-cleanliness')
  this.count = $('.counts')
  return this
}

Storage.prototype.loadItems = () => {
  fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(response => {
      storage.renderItemCounts(response)
      response.forEach(item => {
        storage.renderItem(item)
      })
    })
}

Storage.prototype.renderItemCounts = (response) => {
  storage.count.prepend(`<p class="rancid">Rancid Total: ${response.filter(item => item.cleanliness.Rancid === true).length}</p>`)
  storage.count.prepend(`<p class="dusty">Dusty Total: ${response.filter(item => item.cleanliness.Dusty === true).length}</p>`)
  storage.count.prepend(`<p class="sparkling">Sparkling Total: ${response.filter(item => item.cleanliness.Sparkling === true).length}</p>`)
  storage.count.prepend(`<p class="total">Item Total: ${response.length}</p>`)
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
    .then(response => {
      response.json()
      storage.count.empty()
      storage.showItems.empty()
      storage.loadItems()
    })
}

Storage.prototype.updateItem = (id, cleanliness) => {
  fetch(`http://localhost:3000/items/${id}`,
    {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cleanliness: cleanliness
      })
    })
  .then(response => console.log(response))
}

Storage.prototype.renderItem = (response) => {
  console.log(response.cleanliness)
  storage.showItems.append(`
      <article id="${response.id}"
        class="response-article">
        <h2>${response.name}</h2>
        <p>${response.reason}</p>
        <select name="cleanliness">
          <option value="Sparkling">Sparkling</option>
          <option value="Dusty">Dusty</option>
          <option value="Rancid">Rancid</option>
        </select>
      </article>
      `)
}

Storage.prototype.formatCleanliness = (e) => {
  const selected = e.target.previousElementSibling.value
  const format = {
    Sparkling: false,
    Dusty: false,
    Rancid: false
  }
  return Object.assign(format, {[selected]: true})
}

const storage = new Storage

storage.submitItemButton.on('click', (e) => {
  e.preventDefault()

  storage.addItem(storage.nameInput.val(), storage.reasonInput.val(),  storage.formatCleanliness(e))
})

storage.garage.on('click', '.update-cleanliness', (e) => {
  const id = e.target.closest('article').id
  const cleanliness = e.target.closest('p').innerText

  storage.updateItem(id, cleanliness)
})

storage.garageDoor.on('click', () => {
  storage.garage.show()
})


$(() => {
  storage.garage.hide()
  storage.loadItems()
})
