const theatreId = "https://evening-plateau-54365.herokuapp.com/theatres/163";
// DOM Selectors
let showings;
const cardContainer = document.querySelector("#cardsContainer")

//Functional stuff
const displayMoviesList = (theatre) => {
    showings = theatre.showings
    console.log(showings)
    showings.forEach(renderShow)
}


const renderShow = (show) => {
    const eachCard = document.createElement("div")
    const divContent = document.createElement("div")
    const divHeader = document.createElement("div")
    const divMeta = document.createElement("div")
    const divDescription = document.createElement("div")
    
    const uiLabel = document.createElement("span")
    const divMeta = document.createElement("div")

    
    divContent.className = "content"

    divHeader.className = "header"
    divHeader.textContent = show.film.title

    divMeta.className = "meta"
    divMeta.textContent = `${show.film.runtime} minutes`
    let capacity = show.capacity
    let ticketsSold = show.tickets_sold
    eachCard.dataset.id = show.id
    eachCard.className = "card"


    eachCard.innerHTML = `
    <div class="content">
        <div class="header">
            ${show.film.title}
        </div>
    <div class="meta">
      ${show.film.runtime} minutes
    </div>
    <div class="description">
      ${capacity - ticketsSold} remaining tickets
    </div>
    <span class="ui label">
      ${show.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>`

    cardContainer.appendChild(eachCard)
    const blueBtn = document.querySelector(".button")
    console.log(blueBtn)
    

    //handler
    // const createNewTicket = () => {
    //     return fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
    //         method: "POST", 
    //         headers: {
    //             "Content-Type" : "application/json",
    //             "Accept" : "application/json"
    //         }
    //         body: JSON.stringify({
    //             showing_id: eachCard.dataset.id
    //         })
    //     })
    //     .then(r => r.json())
    // }


    const subtractOnClickHandler = (e) =>{
        e.preventDefault()
        console.log(e)
        console.log("you clicked me")
        // if ((capacity - ticketsSold) > 0){
        //     createNewTicket()

        //     ticketsSold += 1
        //     remainingTix.textContent = `${capacity - ticketsSold} remaining tickets`
        // } else {
        //     ticketsSold += 1
        //     remainingTix.textContent = `${capacity - ticketsSold} remaining tickets`
        //     buyTicket.textContent = "Sold Out"
        // }
    }


    // Event Listeners
    blueBtn.addEventListener("click", subtractOnClickHandler)


}



// Fetch
const fetchMovies = () => {
    return fetch(theatreId).then(r => r.json())
}
fetchMovies().then(displayMoviesList)