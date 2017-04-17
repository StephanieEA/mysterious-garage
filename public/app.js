const Storage = function () {
  this.garageDoor = $('.toggle-garage')
  this.garage = $('.garage')
  this.nameInput = $('.name-input')
  this.reasonInput = $('.reason-input')
  this.cleanlinessInput = $('.cleanliness')
  this.submitItemButton = $('.submit-item-button')
  this.showItems = $('.show-items')
  this.count = $('.counts')
  this.search = $('.search')
  this.displayItem = $('.display-item')
  this.sortAlphabeticlaly = $('.alphabetical-sort')
  this.all = null
  return this
}

Storage.prototype.loadItems = () => {
  fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(response => {
      storage.all = response
      console.log(storage.all)
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
  fetch(`/items`,
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
      console.log(response)
      storage.count.empty()
      storage.showItems.empty()
      storage.loadItems()
      storage.nameInput.val('')
      storage.reasonInput.val('')
    })
}

Storage.prototype.updateItem = (id, cleanliness) => {
  fetch(`/items/${id}`,
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
  storage.showItems.append(`
      <article id="${response.id}" class="response-article">
        <button class="display-item">${response.name}</button>
        <p>${response.reason}</p>
        <select name="cleanliness">
          <option value="Sparkling">Sparkling</option>
          <option value="Dusty">Dusty</option>
          <option value="Rancid">Rancid</option>
        </select>
      </article>
      `)
  storage.renderCleanlinessSelection(response)
}

Storage.prototype.renderCleanlinessSelection = (response) => {
  var keys = Object.keys(response.cleanliness)
  $(`#${response.id} select`).val(keys.find(option => response.cleanliness[option]))
}

Storage.prototype.formatCleanliness = (e, selection) => {
  const format = {
    Sparkling: false,
    Dusty: false,
    Rancid: false
  }
  return Object.assign(format, {[selection]: true})
}

Storage.prototype.searchByName = (e) => {
  storage.showItems.empty()
  let searchText = e.target.value.toLowerCase()
  if (searchText === '') {
    return storage.all.forEach(item => storage.renderItem(item))
  } else {
    let matches = storage.all.filter(item => {
      return item.name.toLowerCase().includes(searchText)
    })
    matches.forEach(match => storage.renderItem(match))
  }
}

Storage.prototype.sortAlphabetically = () => {
  const sorted = storage.all.sort((a,b) {
    return a.name.toLowerCase() > b.name.toLowerCase()
  )}
  storage.showItems.empty()
  sorted.forEach(item => storage.renderItem(item))
}

const storage = new Storage

storage.garageDoor.on('click', () => {
  storage.garage.show()
  storage.garageDoor.remove()
})

storage.search.on('keyup', (e) => storage.searchByName(e))

storage.submitItemButton.on('click', (e) => {
  e.preventDefault()
  const selection = e.target.previousElementSibling.value

  storage.addItem(storage.nameInput.val(), storage.reasonInput.val(),
                  storage.formatCleanliness(e, selection))
})

storage.garage.on('change', 'article select', (e) => {
  const id = e.target.closest('article').id
  const selection = e.target.value

  storage.updateItem(id, storage.formatCleanliness(e, selection))
})

storage.garage.on('click', '.display-item', (e) => {
  let id = e.target.closest('article').id
  let chosen = storage.all.find(item => item.id === id)
  storage.showItems.empty()
  storage.count.empty()
  storage.renderItem(chosen)
})

storage.garage.on('click', '.alphabetical-sort', (e) => {
  storage.sortAlphabetically()
})

$(() => {
  storage.garage.hide()
  storage.loadItems()
})
