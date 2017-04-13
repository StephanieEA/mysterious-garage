$('.toggle-garage').on('click', () => {
  $('.garage').show()
})

$('.submit-item-button').on('click', (e) => {
  e.preventDefault()
  fetch(`http://localhost:3000/items`,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: $('.name-input').val(),
          reason: $('.reason-input').val(),
          cleanliness: $('.cleanliness-input').val()
        })
      })
      .then(response => response.json())
      .then(response => {
        $('.show-items').append(`
          <article id="${response.id}"
             class="response-article">
             <h2>${response.name}</h2>
             <p>${response.reason}</p>
             <p>${response.cleanliness}</p>
          </article>`)
      })
})

$(() => {
  $('.garage').hide()
  fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(response => {
      response.forEach(item => {
        $('.show-items').append(`
          <article id="${item.id}"
             class="item-article">
             <h2>${item.name}</h2>
             <p>${item.reason}</p>
             <p>${item.cleanliness}</p>
          </article>`)
      })
    })

})
