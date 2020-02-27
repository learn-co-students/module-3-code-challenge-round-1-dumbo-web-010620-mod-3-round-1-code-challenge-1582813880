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
        console.log(shows.showings) //returns an array movies
        let eachMovie = document.createElement('div')
        eachMovie.innerHTML = `
        <div class="card">
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
                    <div class="ui blue button">Buy Ticket</div>
                </div>
            </div> 
        `
        showingDiv.appendChild(eachMovie) //returns an error of cant read property 'append'. Error because defered was spelled wrong.ARGGGGG
    });
}