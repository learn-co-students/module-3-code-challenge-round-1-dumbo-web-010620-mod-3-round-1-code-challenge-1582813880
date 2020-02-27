// document.addEventListener('DOMContentLoaded', () => {

const theatreId = 154;
//where showings will go
const showingsDiv = document.querySelector('#uicardsshowings') 
const showingsParent = document.createElement('ul') //parent of showingLi
showingsDiv.append(showingsParent)
let url = 'https://evening-plateau-54365.herokuapp.com/theatres/154'
let showings;
const getshowings = () => fetch(url).then(response => response.json()).then(theater => showings = theater['showings'])
getshowings().then(showings => showings.forEach(
    showing => { renderShowing(showing)
    }
    ))
    

//###################### slap on the dom function ################
    function renderShowing(showing){
        //* As a user, when the page loads I should see a list of movie showings fetched from a remote API.
        const showingLi = document.createElement('li') //will live
        const buyTicket = document.createElement('button')
        buyTicket.innerText = "Buy Ticket"
        buyTicket.dataset.id = showing.id
        let currentTicketCount = showing.tickets_sold

        buyTicket.addEventListener('onclick', (event) => {
            event.preventDefault();
            console.log('hi')
            
            // if (currentTicketCount > 0){
                //     currentTicketCount -= 1
                // } else {
                    //     return "You can't buy anymore"
                    // }
                    
                })
                
                showingLi.innerHTML =
                `
                <div>
                <h1>Title: ${showing.film.title}</h1>
                <h2>Showtime: ${showing.showtime} </h2>
                <h3>Runtime: ${showing.film.runtime}</h3>
                <h3>Capacity: ${showing.capacity}</h3>
                <p>Tickets Sold: ${currentTicketCount}</p>
                </div>
                `
                
                showingLi.append(buyTicket)
                
                showingsParent.append(showingLi)
                
                //we need to add an event listener to the buy tickets button
           

                fetch(`https://evening-plateau-54365.herokuapp.com/tickets`,  {
                    method: 'POST',
                       headers: {
                           'Content-Type': "application/json",
                           'Accept': "application/json"
                       },
                       body: JSON.stringify({showing_id: showing.id} )
                   })
                   .then(response => response.json())
                   .then(console.log)

                
                
            }
            
            //###################### end slap on the dom function ################
            
            
            
            
            
        
        
        
            //       

//* As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one. This information should be persisted in the remote API.

//* As a user I should not be able to purchase a ticket for a sold out showing. The 'Buy Ticket' button should be disabled on sold out showings, and the text should change to "sold out".


//There are two endpoints you will use, one to fetch all of the data associated with your assigned theatre and the other to create tickets in the database.

//The number of tickets remaining for a showing can be determined by subtracting the current `tickets_sold` from the total `capacity` of the showing.

//To create a new ticket it must belong to a showing. The body of the request must contain a key called  `showing_id`

//POST `https://evening-plateau-54365.herokuapp.com/tickets`













// })