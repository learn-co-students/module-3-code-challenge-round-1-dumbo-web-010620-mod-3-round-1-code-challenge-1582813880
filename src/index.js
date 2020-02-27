document.addEventListener('DOMContentLoaded', () => {

    const theatreId = 158;

    async function fetchMovies() {
        return fetch('https://evening-plateau-54365.herokuapp.com/theatres/158')
        .then(response => response.json())
        .then(movies => movies.showings.forEach(movie => {
            renderMovies(movie); 
        }))
    }
    
    function renderMovies(movieObj) {
        const allShowings = document.querySelector("div.ui.cards.showings")
        allShowings.innerHTML += `
                <div class="content">
                <div class="header">
                ${movieObj.film.title}
                </div>
                <div class="meta">
                ${movieObj.film.runtime}
                </div>
                <div class="description">
                ${movieObj.tickets_sold} remaining tickets
                </div>
                <span class="ui label">
                ${movieObj.showtime}
                </span>
                </div>
                <div class="extra content">
                <div class="ui blue button">Buy Ticket</div>
                </div>
                </div>`
    }
       
  
fetchMovies()
    // end of DOMContentLoaded
})

    
