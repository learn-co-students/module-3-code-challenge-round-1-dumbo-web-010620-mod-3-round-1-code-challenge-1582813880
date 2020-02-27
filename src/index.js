const theatreId = 152;
const showingDiv = document.querySelector('.showings');
// console.log(showingDiv);

//  inital fetch
fetch('https://evening-plateau-54365.herokuapp.com/theatres/152')
.then(r => r.json())
.then(renderShow)

// renderFunction should be able to pinnt out the all the showing 
// with the information.
function renderShow(shows){
    // console.log(shows.showings) //gives back an array of all the show listings
    shows.showings.forEach(movie => {
        // console.log(shows.showings) //returns an array movies
        let eachMovie = document.createElement('div');
        eachMovie.className = "card";
        eachMovie.innerHTML = `
                <div class="content">
                    <div class="header">
                        ${movie.film.title}
                    </div>
                    <div class="meta">
                        ${movie.film.runtime} minutes
                    </div>
                    <div class="description">
                        ${parseFloat(movie.capacity - movie.tickets_sold)}remaining tickets
                    </div>
                    <span class="ui label">
                        ${movie.showtime}
                    </span>
                </div>
                <div class="extra content">
                    <div class="ui blue button" id="blueButton">Buy Ticket</div>
                </div> 
        `
        showingDiv.appendChild(eachMovie) //returns an error of cant read property 'append'.Fixed. Error because defered was spelled wrong.ARGGGGG
    }
    );
}

//test to see if event listener works.
//it does.
// test = document.querySelector("body > div.ui.inverted.red.menu")
// test.addEventListener("click", (e) => {
//     console.log('clicked here')
// })

//why is bluBttn returning null? 
bluBttn = document.querySelector("#blueButton")
console.log(bluBttn) //returns null, why???

//if this was working I would do something like this:
//use the show_id to update that specific show and decrease the counter.
//use the fetch POST method to update it to the DB and change the counter on the show page.S
// once the ticket count reaches 0, button is disabled and reads sold out.
bluBttn.addEventListener("click", (e) => {
    // console.log('this was pressed') //returning uncaught Type Error


//     fetch(`https://evening-plateau-54365.herokuapp.com/tickets${showing_id}`, {
//     method: 'POST', // or 'PUT'
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: JSON.stringify(data),
// })
// .then((response) => response.json())
// .then((data) => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });
}); 
