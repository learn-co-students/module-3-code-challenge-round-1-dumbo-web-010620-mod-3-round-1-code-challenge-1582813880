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
    const extraContent = document.createElement("div")
    const blueBtn = document.createElement("div")

    let capacity = show.capacity
    let ticketsSold = show.tickets_sold

    let remainingTix = capacity - ticketsSold
    uiLabel.className = "ui label"
    divContent.className = "content"
    divHeader.className = "header"
    extraContent.className = "extra content"
    blueBtn.className = "ui blue button"
    divMeta.className = "meta"
    divDescription.className = "description"

    divHeader.textContent = show.film.title
    divMeta.textContent = `${show.film.runtime} minutes`
    divDescription.textContent = `${remainingTix} remaining tickets`
    uiLabel.textContent = show.showtime
    blueBtn.textContent = "Buy Ticket"

    blueBtn.dataset.id = show.id
    eachCard.className = "card"

    divContent.append(divHeader, divMeta, divDescription, uiLabel) // film title inside the content.
    extraContent.appendChild(blueBtn)

    eachCard.append(divContent, extraContent)
    cardContainer.appendChild(eachCard)
    
    blueBtn.addEventListener("click", (e) => {
        e.preventDefault()

        const createNewTicket = () =>{
            showing_id: e.target.dataset.id
        }

        if (remainingTix > 0){
            return fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(createNewTicket)
            })
            .then(r => console.log(r.json())
        } else {
            return fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify({
                    error: "That showing is sold out"
                })
            })
            blueBtn.textContent = "Sold Out"
        }
    })
}


// Fetch
const fetchMovies = () => {
    return fetch(theatreId).then(r => r.json())
}
fetchMovies().then(displayMoviesList)