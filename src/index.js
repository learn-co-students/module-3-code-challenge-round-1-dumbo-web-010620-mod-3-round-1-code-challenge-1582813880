const theatreId = 157;
const theatreUrl = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`;

let cards = document.querySelector(".cards");

fetch(theatreUrl)
    .then( res => res.json() )
    .then( theatres => theatres.showings.forEach( show => onTheDom(show)))


const onTheDom = showObj => {

    let parentDiv = document.createElement("div")
    let parentChDiv = document.createElement("div")
    let firstChDiv = document.createElement("div")
    let secondChDiv = document.createElement("div")
    let thirdChDiv = document.createElement("div")
    let fourChSpan = document.createElement("span")
    let extraDiv = document.createElement("div")
    let btnDiv = document.createElement("div")

    let leftTickets = showObj.capacity -  showObj.tickets_sold // total amount of tix left per show

    parentDiv.setAttribute("class", "card")
    parentChDiv.setAttribute("class", "content")
    firstChDiv.setAttribute("class", "header")
    secondChDiv.setAttribute("class", "meta")
    thirdChDiv.setAttribute("class", "description")
    fourChSpan.setAttribute("class", "ui label")
    extraDiv.setAttribute("class", "extra content")
    btnDiv.setAttribute("class", "ui blue button")

    firstChDiv.innerText = showObj.film["title"]
    secondChDiv.innerText = showObj.film["runtime"]
    thirdChDiv.innerText = `${leftTickets} remaining tickets`
    fourChSpan.innerText = showObj.showtime
    btnDiv.innerText = "Buy Ticket"

    parentDiv.append(parentChDiv, extraDiv)
    parentChDiv.append(firstChDiv, secondChDiv, thirdChDiv, fourChSpan)
    extraDiv.append(btnDiv)

    cards.append(parentDiv)

    if( leftTickets === 0){
        btnDiv.parentElement.innerHTML = `<P><b>SOLD OUT</b></P>` // cd .. then replace me maybe it should have been a div .. they may have styled that tag  this on CSS
    }

    btnDiv.addEventListener("click", event => {
        // console.log("Stop clicked me " + showObj.id);
        

        // Didn't finish the post req all the way. but commented my helper fn out to not break the code.
        buyMe(event, showObj) 
    })


    // <div class="card">
    //     <div class="content">
    //         <div class="header">
    //         (Film Title)
    //         </div>
    //         <div class="meta">
    //         (Runtime) minutes
    //         </div>
    //         <div class="description">
    //         (Num Tickets) remaining tickets
    //         </div>
    //         <span class="ui label">
    //         (Showtime)
    //         </span>
    //     </div>
    //     <div class="extra content">
    //         <div class="ui blue button">Buy Ticket</div>
    //     </div>
    // </div>
}


const buyMe = (event, showObj) => {

    return fetch(`http://localhost:3000/tickets`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                showId: showObj.id
            })
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            let updateTickets = showObj.find( (show) => {
                show.id === data.showing_id
            
            })
        })
}
