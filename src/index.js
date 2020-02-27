const theatreId = "https://evening-plateau-54365.herokuapp.com/theatres/162"

let theatreObjectsarr = [];

const getTheatres =  () => {
   return fetch(theatreId)
   .then(res => res.json())
   .then(theatre => {
       theatreObjectsarr = theatre.showings
       //As a user, when the page loads I should 
       //see a list of movie showings fetched from a remote API.
       theatre.showings.forEach(showingObject => {
          const divCard = document.createElement('div')
          divCard.setAttribute('class','card')
          divCard.innerHTML = `
          <div class="content">
            <div class="header">
                ${showingObject.film.title}
         </div>
         <div class="meta">
         ${showingObject.film.runtime}
         </div>
         <div class="description" data-set="${showingObject.id}">
             ${showingObject.capacity - showingObject.tickets_sold} remaining tickets
        </div>
        <span class="ui label">
          ${showingObject.showtime}
        </span>
    </div>
          `
          const divExtraContent = document.createElement('div')
          divExtraContent.className = "extra-content"
          divCard.append(divExtraContent)
          const buttonDiv = document.createElement('div')
          buttonDiv.className = "ui blue button"
          buttonDiv.setAttribute('data-id', `${showingObject.id}`)
          buttonDiv.innerText = "Buy Ticket"
            
          divExtraContent.append(buttonDiv)
        //   <div class="ui blue button" data-id="${showingObject.id}">Buy Ticket</div>

          const showingDiv = document.querySelector('.showings')
          showingDiv.append(divCard)
          

          buttonDiv.addEventListener('click', (e) => {
              const getRemainingTickets = document.querySelector('.description')
              fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                   showing_id: `${showingObject.id}`
                }),
              }).then(res => res.json())
              .then(newTicket => decrementValueToFetch(newTicket))

              })
              const decrementValueToFetch = (newTicket) => {
                console.log(showingObject) 
                console.log(newTicket)
                if (showingObject.tickets_sold === 20) {
                    buttonDiv.remove()
                    const createSoldOut = document.createElement('div')
                    createSoldOut.innerText = "Sold Out"
                    createSoldOut.style.color = 'grey'
                    divExtraContent.append(createSoldOut)

                } 
              }
          })
       });
   }


getTheatres()


/* <div class="card">
  <div class="content">
    <div class="header">
      (Film Title)
    </div>
    <div class="meta">
      (Runtime) minutes
    </div>
    <div class="description">
      (Num Tickets) remaining tickets
    </div>
    <span class="ui label">
      (Showtime)
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
// </div> */