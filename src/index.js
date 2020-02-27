document.addEventListener('DOMContentLoaded', () => {

    const theatreId = 158;

    async function fetchMovies() {
        return fetch('https://evening-plateau-54365.herokuapp.com/theatres/158')
        .then(response => response.json())
        .then(movies => movies.array.forEach(movie => {
            renderMovies(movie)
        }))
    }
    
    function renderMovies(movieObj) {
        const allShowings = document.querySelector("div.ui.cards.showings")
        allShowings.innerHTML += `
            <h4>${movieObj.showings[0]['film']}</h4>
                <p>${movieObj.showings}</p>
                    <p>${movieObj.showings}</p>`
        
        }





fetchMovies()
    // end of DOMContentLoaded
})


//       <button class="like-btn">Like <3</button>
//       <button class="delete-btn">Delete</button>
//  </div>
// `
