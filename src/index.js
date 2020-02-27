const theatreId = 151

document.addEventListener("DOMContentLoaded", event => {
    event.preventDefault()
//step 1 - render one showing
const showingList = document.querySelector(".showings")
function renderShowing(showing) {
    const newDiv = document.createElement("div")
    newDiv.innerHTML = `
    <div class="card">
        <div class="content">
            <div class="header">
            ${showing.film.title}
            </div>
            <div class="meta">
            ${showing.film.runtime} minutes
            </div>
             <div class="description">
            ${showing.capacity - showing.tickets_sold}
            </div>
            <span class="ui label">
            ${showing.showtime}
            </span> remaining tickets
        </div>
        <div class="extra content">
            <div class="ui blue button">Buy Ticket</div>
        </div>
    </div
    `
    showingList.append(newDiv)

    const buyBtn = newDiv.querySelector(".button")
    const counter = newDiv.querySelector(".description")
    if (counter.innerText == 0) {
        buyBtn.outerHTML = "Sold Out"
    }
    // step 4 create addeventlistener for buy button
    buyBtn.addEventListener("click", event => {
        counter.innerText = counter.innerText - 1
            if (counter.innerText == 0) {
                buyBtn.outerHTML = "Sold Out"
            }
        newTicket(showing.id)
    })

}

// step 2 render all showing
function renderAllshowings(showings) {
    console.log(showings)
    showings.showings.forEach(showings => {
        renderShowing(showings)
    })
}

// step 3 fetch data from API 
fetch("https://evening-plateau-54365.herokuapp.com/theatres/151")
    .then(r => r.json())
    .then(showings => {
        renderAllshowings(showings)
    })

})

// step 5 create tickets and save to backend 
// --- helper function --- 

function newTicket(showing_id) {
    fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            showing_id: showing_id
        })
    })
    .then(r => r.json())
    .then(json => json)
}

