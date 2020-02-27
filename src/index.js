document.addEventListener('DOMContentLoaded', () => {
    // let allMovies;
    const theatreId = 156;
    const fetchMovies = () => {
        return fetch("https://evening-plateau-54365.herokuapp.com/theatres/156")
        .then(resp => resp.json())
        .then(movies => { 
            movies.forEach(movie => renderMovieLi(movie))
            // allMovies = allMovieArray
            // renderEachMovie(allMovieArray)
        })
    }

    // const renderEachMovie = (allMovieArray) => {
    //     allMovieArray.forEach(movieObj => renderMovieLi(movieObj))
    //     console.log("hi")
    // }

    const renderMovieLi = (movieObj) => {
        const movie = document.createElement("div")
        const ui = document.querySelector(".ui-cards-showings")
        movie.className = "showing"
        movie.innerHTML = `
        <div class="card">
  <div class="content">
    <div class="header">
      ${movieObj.showings.film.title}
    </div>
    <div class="meta">
    ${movieObj.showings.film.runtime}
    </div>
    <div class="description">
    
    </div>
    <span class="ui label">
      ${mobieObj.showings.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>`
ui.append(movie)

    }









fetchMovies()

})


