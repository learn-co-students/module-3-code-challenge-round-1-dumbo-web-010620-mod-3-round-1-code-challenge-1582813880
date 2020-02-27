// Deliverables
// You will be building out an application that 
// allows a user to purchase movie tickets.

// As a user, when the page loads I should see 
// a list of movie showings fetched from a remote API.

// As a user, clicking on the 'Buy Ticket' button 
// should purchase a ticket and decrement the 
// remaining tickets by one. This information 
// should be persisted in the remote API.

// As a user I should not be able to purchase a 
// ticket for a sold out showing. The 'Buy Ticket' 
// button should be disabled on sold out showings, 
// and the text should change to "sold out".

const theatreId = 159;

document.addEventListener("DOMContentLoaded", () => {
    loadMovies()
    
})

function loadMovies() {
    let url = "https://evening-plateau-54365.herokuapp.com/theatres/159"
    fetch(url)
    .then(resp => resp.json())
    .then(obj => {
        obj["showings"].forEach(movie => createMovieCard(movie))
    })
    // console.log(obj["showings"].forEach(movie => console.log(movie)))})
    // .then(obj => obj.forEach(movie => console.log(movie)))
}

function createMovieCard(movie) {
    // console.log(movie["capacity"], movie["tickets_sold"])
    let capacity = movie["capacity"]
    let ticketsSold = movie["tickets_sold"]
    let remainingTickets = capacity - ticketsSold

    const movieCard = document.createElement("div")
    movieCard.innerHTML = 
    `
    <div class="card">
    <div class="content">
      <div class="header">
        ${movie["film"]["title"]}
      </div>
      <div class="meta">
        ${movie["film"]["runtime"]} minutes
      </div>
      <div class="description">
        ${remainingTickets} remaining tickets
      </div>
      <span class="ui label">
        ${movie["showtime"]}
      </span>
    </div>
    <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
    </div>
    </div>
    <br>
    <br>
    `
    slapThatDOM(movieCard)
}

function slapThatDOM(movieCard) {
    const movieCardContainer = document.querySelector(".ui-cards-showings")
    movieCardContainer.appendChild(movieCard)
}



