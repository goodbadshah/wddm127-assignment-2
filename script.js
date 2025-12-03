const app = {};

app.apiKey = "762d859fef5862289ee8eedbcfa8addb";

app.form = document.querySelector(".movieForm");
app.input = document.querySelector(".movieInput");
app.movieTitle = document.querySelector(".movieTitle");
app.movieDetails = document.querySelector(".movieDetails");
app.similarMovies = document.querySelector(".similarMovies");

app.searchMovie = (title) => {
    const searchURL = new URL("https://api.themoviedb.org/3/search/movie");
    searchURL.search = new URLSearchParams({
        api_key: app.apiKey,
        query: title
    });
    
    fetch(searchURL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        if (data.results.length === 0) {
            document.querySelector('.originalMovie').style.display = 'block';
            app.movieTitle.textContent = "D'oh! Try again!";
            return;
        }
        
        const movie = data.results[0];
        app.displayOriginalMovie(movie);
        app.getSimilarMovies(movie.id);
    });
};

app.getSimilarMovies = (movieId) => {
    const similarURL = new URL("https://api.themoviedb.org/3/movie/" + movieId + "/similar");
    similarURL.search = new URLSearchParams({
        api_key: app.apiKey
    });
    
    fetch(similarURL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        app.displaySimilarMovies(data.results);
    });
};

app.displayOriginalMovie = (movie) => {
    document.querySelector('.originalMovie').style.display = 'block';
    app.movieTitle.textContent = `You liked: ${movie.title}`;
    
    if (movie.poster_path) {
        const poster = document.createElement('img');
        poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        poster.alt = movie.title;
        app.movieDetails.appendChild(poster);
    } else {
        const noPoster = document.createElement('p');
        noPoster.textContent = 'No image available';
        app.movieDetails.appendChild(noPoster);
    }
    
    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Released: ${movie.release_date ? movie.release_date : 'Released... at some point in time!'}`;
    app.movieDetails.appendChild(releaseDate);
    
    const overview = document.createElement('p');
    overview.textContent = movie.overview ? movie.overview : 'No idea!';
    app.movieDetails.appendChild(overview);
    
};

app.displaySimilarMovies = (movies) => {
    if (movies.length === 0) {
        const noResults = document.createElement('h3');
        noResults.textContent = "Your movie choice stands alone.";
        app.similarMovies.appendChild(noResults);
        return;
    }
    
    app.similarMovies.style.display = 'block';
    
    const randomIndex = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIndex];
    const card = document.createElement('div');
    card.className = 'movieCard';
    
    const header = document.createElement('h2');
    header.textContent = "You'll LOVE: " + movie.title;
    card.appendChild(header);
    
    if (movie.poster_path) {
        const poster = document.createElement('img');
        poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        poster.alt = movie.title;
        card.appendChild(poster);
    } else {
        const noPoster = document.createElement('p');
        noPoster.textContent = 'No image available';
        card.appendChild(noPoster);
    }
    
    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Released: ${movie.release_date ? movie.release_date : 'Released... at some point in time!'}`;
    card.appendChild(releaseDate);
    
    const overview = document.createElement('p');
    overview.textContent = movie.overview ? movie.overview : 'No idea!';
    card.appendChild(overview);
    
    
    app.similarMovies.appendChild(card);
};

app.clearResults = () => {
    app.movieTitle.textContent = "";
    app.movieDetails.innerHTML = "";
    app.similarMovies.innerHTML = "";
    document.querySelector('.originalMovie').style.display = 'none';
    document.querySelector('.similarMovies').style.display = 'none';
};

app.formEvent = () => {
    app.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const movieTitle = app.input.value.trim();
        
        if (!movieTitle) {
            app.movieTitle.textContent = "Enter the title of a movie you liked!";
            return;
        }
        
        app.clearResults();
        app.searchMovie(movieTitle);
    });
};

app.init = () => {
    app.formEvent();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", app.init);
} else {
    app.init();
}
