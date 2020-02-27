const theatreId = 153;

const showingDiv = document.querySelector('.showings')



function fetchTheatre(){
    return fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(resp => resp.json())
    .then(json => {
        showings = (json.showings)
        console.log(showings)})

}

function renderShowings(){
    fetchTheatre().then(() =>{
        showings.forEach(show => {
            let divCard = document.createElement('div')
            divCard.className = 'card'
            
            let divContent = document.createElement('div')
            divContent.className ='content'
            divCard.append(divContent)

            let divHeader = document.createElement('div')
            divHeader.className ='header'
            divContent.append(divHeader)
            divHeader.innerText = show.film.title

            let divMeta = document.createElement('div')
            divMeta.className = 'meta'
            divMeta.innerText = show.film.runtime + ' minutes'
            divContent.append(divMeta)

            let divDescription = document.createElement('div')
            divDescription.className = 'description'
            ticketsLeft = show.capacity - show.tickets_sold

            divDescription.innerText = ticketsLeft + ' remaining tickets'
            divContent.append(divDescription)

            let spanLabel = document.createElement('span')
            spanLabel.className = 'ui label'
            spanLabel = show.showtime
            divContent.append(spanLabel)

            let divXcontent = document.createElement('div')
            divXcontent.className = 'extra content'
            divCard.append(divXcontent)


            let divButton = document.createElement('div')
            divButton.className = 'ui blue button'
            divButton.innerText = 'Buy Ticket'
            soldOut(show,divButton)
            divXcontent.append(divButton)




            showingDiv.appendChild(divCard)

//--------------------end of DOM set-up-----------------------


            divButton.addEventListener('click', event => {
                buyTicket(show)
                divDescription.innerText = ""
                divButton.innerText = ""

                if (show.capacity === show.tickets_sold){
                divDescription.innerText = show.capacity - show.tickets_sold + ' remaining tickets'
                soldOut(show,divButton)
                divButton.className = 'disabled'}
                else{
                    show.capacity -= 1
                    divDescription.innerText = show.capacity - show.tickets_sold + ' remaining tickets' 
                    divButton.innerText = 'Buy Ticket'}
                    
                
             })
        })
    })

}//-----------------end of renderShowings-------------------------------------

function buyTicket(show){

    ticketObj={showing_id: show.id}
    fetch("https://evening-plateau-54365.herokuapp.com/tickets",{
    method: 'POST',
    headers:{'Content-Type': 'application/json',
    'Accept': 'application/json'},
    body: JSON.stringify(ticketObj)
    })
    .then(resp=> resp.json())
    .then(json => console.log(json))
    .catch(sold => "error: That showing is sold out")

}

function soldOut(show,div){
    if (show.capacity === show.tickets_sold){
        div.innerText = 'Sold Out'
        div.className = 'disabled'}
}



renderShowings()