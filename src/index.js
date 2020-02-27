const theatreID = 155
const ticketsRemaining = tickets_sold - capacity


fetch("https://evening-plateau-54365.herokuapp.com/theatres/155")
.then(resp => resp.json())
.then(showings => showings.forEach(renderShowings))
// having trouble thinking of how to access the JSON information because the format it is returned in.
// flashbacks to Hashketball
// I will try write as much code as I can as if I could actually see the page. :(

// rendering single showing
function renderShowings(showing) {
    const parentDiv = document.querySelector('#div')
    parentDiv.setAttribute("id", "showings")
    //create element for each showing
    const movieSpan = document.createElement('span')
    parentDiv.appendChild(movieSpan)

    movieSpan.innerHTML = 
    `
    <div class="card">
        <div class="content">
        <div class="header">
      ${film.title}
    </div>
    <div class="meta">
      ${film.runtime} minutes
    </div>
    <div class="description">
      (Num Tickets) ${ticketsRemaining}
    </div>
        <span class="ui label">(Showtime)</span>
    </div>
    <div class="extra content">
        <div class="ui blue button">Buy Ticket</div>
    </div>
    </div>
    `

    //event on button
    const button = movieSpan.querySelector(".ui blue button")

    button.addEventListener("click", () => {

        if (ticketsRemaining === 0) {
            button.innerText = "Sold out"
            } else {
        button.innerText = `${ticketsRemaining--}`
    }

    }

    fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            showing_id: showing.id
        })
    })
    .then(resp => resp.json())
    .then(newTicketObj => renderSingleTicket(newTicketObj))



}