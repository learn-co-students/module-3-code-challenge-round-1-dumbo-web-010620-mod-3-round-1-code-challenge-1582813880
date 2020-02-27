// https://evening-plateau-54365.herokuapp.com/
//
// https://evening-plateau-54365.herokuapp.com/theatres/160
//
// [X] As a user, when the page loads I should see a list of movie showings fetched from a remote API.
//
// [X]As a user, clicking on the 'Buy Ticket' button should purchase a ticket and
// decrement the remaining tickets by one. This information should be persisted
// in the remote API.
//
// As a user I should not be able to purchase a ticket for a sold out showing.
// The 'Buy Ticket' button should be disabled on sold out showings,
// and the text should change to "sold out".


const theatreId = 160;
const showingsDiv = document.querySelector(".ui.cards.showings")
let buyButton;
let allShowings;

// helpers
const decrementTickets = (showingDiv, ticketsRemaining) => {

}
const renderSingleShowing = (showingObj) => {
  const newShowingDiv = document.createElement("div")
  newShowingDiv.className = "card"
  showingsDiv.append(newShowingDiv)

  let ticketsRemaining = showingObj.capacity - showingObj.tickets_sold

  newShowingDiv.innerHTML = `
  <div class="content">
  <div class="header">
    ${showingObj.film.title}
  </div>
  <div class="meta">
    ${showingObj.film.runtime}
  </div>
  <div class="description">
    ${ticketsRemaining} remaining tickets
  </div>
  <span class="ui label">
    ${showingObj.showtime}
  </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
  `


  const extraDiv = newShowingDiv.querySelector(".extra.content")

  if (ticketsRemaining <= 0) {
    extraDiv.innerHTML = `
      <div class="ui blue button">Sold Out</div>
    `
    return;
  } else {
    buyButton = newShowingDiv.querySelector(".ui.blue.button")
    buyButton.addEventListener("click", (e) => {
      fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({showing_id: showingObj.id })
      })
      .then((res) => res.json())
      .then(data => console.log(data))
      // debugger
      ticketsRemaining-=1
      const remainingTickets = newShowingDiv.querySelector(".description")
      remainingTickets.textContent = `${ticketsRemaining} remaining tickets`
      decrementTickets(newShowingDiv, ticketsRemaining)
      renderSingleShowing(showingObj)
      // end of event
    })
  }
}
const renderShowings = (theatreArray) => {
  theatreArray.showings.forEach((showing) => {
    renderSingleShowing(showing);
  });

}
// event listeners


// initail fetch
fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then((res) => res.json())
  .then(resTheatre => {
    allShowings = resTheatre.showings
    renderShowings(resTheatre)
  })
