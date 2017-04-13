$('.toggle-garage').on('click', () => {
  $('.garage').show()
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
             <p>${item.name}</p>
             <p>${item.reason}</p>
             <p>${item.cleanliness}</p>
          </article>`)
      })
    })

})
