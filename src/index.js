const theatreId = 161;

//fetch GET

const getShowings = () => fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`).then(resp => resp.json())

getShowings().then(data => {
   shows = data.showings
   data.showings.forEach(showObj => {
       listShow(showObj)})})

//fetch for all done



const cardShowings = document.querySelector('div.showings')
// console.log(cardShowings)

//render single show, place in forEach 

function listShow(showObj) {
    //create element for showObj
    // for each showDiv, include film title, reuntime, tickets_remaining = capacity -tickets_sold
    
    //append to proper parent node
    const cardShowDiv = document.createElement('div') //this is the parent of contentDiv
    const contentDiv = document.createElement('div') //this is the parent of headerDiv, metaDiv, descriptionDiv, and showTimeSpan
    const headerDiv = document.createElement('div') //film title will be innerText
    const metaDiv = document.createElement('div') // runtime in minutes will be innerText
    const descriptionDiv = document.createElement('div') //num of tickets --- remaining tickets will be innerText
    const showTimeSpan = document.createElement('span') // showtime will go here
    const extraContentDiv = document.createElement('div') //this is the parent of blueBtnDiv
    const blueBtnDiv = document.createElement('div') //InnerText will say Buy Ticket
    
    cardShowDiv.setAttribute('class', 'card')
    contentDiv.setAttribute('class', 'content')
    headerDiv.setAttribute('class', 'header')
    metaDiv.setAttribute('class', 'meta')
    descriptionDiv.setAttribute('class', 'description')
    descriptionDiv.setAttribute('id', `${showObj.id}`)
    showTimeSpan.setAttribute('class', 'ui label')
    extraContentDiv.setAttribute('class', 'extra content')
    blueBtnDiv.setAttribute('class', 'ui blue button')
    blueBtnDiv.setAttribute('id', `${showObj.id}`)

    
    cardShowDiv.append(contentDiv, extraContentDiv)
    contentDiv.append(headerDiv, metaDiv, descriptionDiv, showTimeSpan)
    extraContentDiv.append(blueBtnDiv)
    // console.log(cardShowDiv)
    // console.log(contentDiv)
    // console.log(headerDiv)
    // console.log(metaDiv)
    // console.log(descriptionDiv)
    // console.log(showTimeSpan)
    // console.log(extraContentDiv)
    // console.log(blueBtnDiv)
    cardShowDiv.dataset.id = showObj.id

    blueBtnDiv.dataset.id = showObj.id
    let remainingTickets = (showObj.capacity - showObj.tickets_sold)
    // console.log(remainingTickets)
    // add attributes
    headerDiv.innerText = showObj.film.title
    metaDiv.innerText = `${showObj.film.runtime} minutes`
    descriptionDiv.innerText = `${remainingTickets} remaining tickets`
    showTimeSpan.innerText = `${showObj.showtime}`
    blueBtnDiv.innerText = 'Buy Ticket'

    //append to parent
    cardShowings.appendChild(cardShowDiv)
    // console.log(cardShowDiv)

    //set ids to proper elements to identify it with the showObj
    // console.log(showObj)

    
    // console.log(decreaseTickets)
    //Event Handlers
    let descriptionDivInnerText = descriptionDiv.innerText

    blueBtnDiv.addEventListener('click', buyTicket)
    

    function getData(event){   //data to put in fetch
        return {
            showing_id: showObj.id
        }
    }


    function buyTicket(event, showObj){
        event.preventDefault(); //prevent default for submit, but currently using click event
        
        let data = getData(event)

        let decreaseTickets = `${parseInt(remainingTickets) -1 } remaining tickets`
        // let descriptionDivInnerText = descriptionDiv.innerText

        //change innerText of blueBtn to sold out when no tickets are available
        if (remainingTickets === 0){
            blueBtnDiv.innerText = 'sold out'
        }
        // console.log(event.target)
        // console.log(decreaseTickets)

        return fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then((ticket) => {
            console.log(ticket)
        //Changing the innerText of descriptionDiv so new number of tickets remaining will render
            })

    }

}