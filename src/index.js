const theatreId = 150;

document.addEventListener("DOMContentLoaded", () => {

    let allShowings;

    const showCard = document.querySelector(".ui-cards-showings")

    function renderOneCard(show) {

        const ticketsRemaining = (show.capacity - show.tickets_sold)
        
        const newDiv = document.createElement("div")
        newDiv.className = "card"
        newDiv.innerHTML = `
            <div class="content">
                <div class="header">
                    ${show.film.title}
                </div>
                <div class="meta">
                    ${show.film.runtime} minutes
                </div>
                <div class="description">
                    ${ticketsRemaining} remaining tickets
                </div>
                    <span class="ui label">
                        ${show.showtime}
                    </span>
                </div>
                <div class="extra-content">
                        <button class="ui-blue-button">Buy Ticket</button>
                </div>
                <br>
            </div>
        `
        showCard.append(newDiv)

        const buyTicketButton = newDiv.querySelector(".ui-blue-button")
        if (ticketsRemaining === 0) {
            buyTicketButton.parentElement.innerHTML = `
                <div class="ui-blue-button"><strong>Sold Out<strong></div>
            `
        }

        buyTicketButton.addEventListener("click", event => {
            
            fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    showing_id: show.id
                })
            })
            .then(response => response.json())
            .then(result => {
                show.tickets_sold += 1
                renderOneCard(show)
            })
        })
    }

    function renderAllCards(array) {
        array.forEach(show => renderOneCard(show))
    }

    fetch("https://evening-plateau-54365.herokuapp.com/theatres/150")
    .then(response => response.json())
    .then(results => {
        allShowings = results.showings
        renderAllCards(allShowings)
    })

})