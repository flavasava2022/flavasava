const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDg5NmZmYmJiOTE1YmMzNDA1NmE5NjkzNzljMDM5MyIsInN1YiI6IjY0YTJjMWQ5OGUyMGM1MDE0ZjJhNThkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CKpKckRctieCmM5DvRuvx-4phCmwxAycNEj5JZdDzBI",
  },
};

let movies = [];
let nowPlayingMovies = [];
let popularMovies = [];
let upcomingMovies = [];
let darkModeStatues = 0;
const container = document.querySelector(".container");
const nowPlayingContainer = document.querySelector(".now-playing-movies");
const popularMoviesContainer = document.querySelector(".popular-movies");
const upcomingMoviesContainer = document.querySelector(".upcoming-movies");

const moviesContainer = document.querySelector(".movies");
const darkMode = document.querySelector(".darkmode");
const movieCard = document.querySelector(".movie-card");
const rightArrowFirst = document.querySelector(".first .fa-caret-left");
const leftArrowFirst = document.querySelector(".first .fa-caret-right");
const rightArrowNow = document.querySelector(".now-playing .fa-caret-left");
const leftArrowNow = document.querySelector(".now-playing .fa-caret-right");
const rightArrowPopular = document.querySelector(
  ".popular-movies .fa-caret-left"
);
const leftArrowPopular = document.querySelector(
  ".popular-movies .fa-caret-right"
);
const rightArrowUpcoming = document.querySelector(
  ".upcoming-movies .fa-caret-left"
);
const leftArrowUpcoming = document.querySelector(
  ".upcoming-movies .fa-caret-right"
);

// fetch top rated movies
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    movies = response.results;

    moviesSlider(movies, moviesContainer, "top_rated");
    arrowSlider(".top_rated", 34, leftArrowFirst, rightArrowFirst, 578);
  })
  .catch((err) => console.error(err));

// *****************************
// fetch now playing movies
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    nowPlayingMovies = response.results;

    moviesSlider(nowPlayingMovies, nowPlayingContainer, "now_playing");
    arrowSlider(".now_playing", 20, leftArrowNow, rightArrowNow, 258);
  })
  .catch((err) => console.error(err));

// ****************************
// fetch popular movies
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    popularMovies = response.results;

    moviesSlider(popularMovies, popularMoviesContainer, "popular_movie");
    arrowSlider(".popular_movie", 20, leftArrowPopular, rightArrowPopular, 258);
  })
  .catch((err) => console.error(err));

// ****************************
// fetch upcoming movies
fetch(
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    upcomingMovies = response.results;

    moviesSlider(upcomingMovies, upcomingMoviesContainer, "upcoming_movie");
    arrowSlider(
      ".upcoming_movie",
      20,
      leftArrowUpcoming,
      rightArrowUpcoming,
      258
    );
  })
  .catch((err) => console.error(err));

// ****************************
// arrow slider function
function arrowSlider(classMovie, margin, leftArrow, rightArrow, end) {
  const firstMovie = document.querySelector(classMovie);
  let start = 0;
  rightArrow.addEventListener("click", () => {
    if (start !== 0) {
      start += margin;
      firstMovie.style.marginLeft = `${start}%`;
    } else if (start == 0) {
      start = -end;
      firstMovie.style.marginLeft = `${start}%`;
    }
  });
  leftArrow.addEventListener("click", () => {
    if (start > -end) {
      start -= margin;
      firstMovie.style.marginLeft = `${start}%`;
    } else if ((start = -end)) {
      start = 0;
      firstMovie.style.marginLeft = `${start}%`;
    }
  });
}
// ************************************
// function to make movies slider
function moviesSlider(movies, container, movieType) {
  movies.forEach((movie) => {
    let html = `
            <div id="${movie.id}" class="${movieType} movie">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
            <div class="text">
              <h5>${movie.original_title}</h5>
              <button class='more-info'>more info</button>
            </div>
            `;
    container.insertAdjacentHTML("beforeend", html);
  });
}
// to open movie card
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("more-info")) {
    let movie = e.target.closest(".movie");

    fetch(
      `https://api.themoviedb.org/3/movie/${movie.getAttribute(
        "id"
      )}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let genre = response.genres;

        movieCard.innerHTML = "";

        let html = `
              <img src="https://image.tmdb.org/t/p/w500${response.poster_path}" alt="" />
                <div class="text">
                  <h2>${response.original_title}</h2>
                  <p>${response.overview}</p>
                  <p><span>Release Date :</span> <span>${response.release_date}</span></p>
                  <p><span>Vote Average :</span> <span>${response.vote_average}</span></p>
                  <p class='genre'><span>Geners :</span> </p>
                  <p><span>revenue :</span> <span>${response.revenue}</span></p>
                  <button class='close'>back</button>
                </div>
              `;
        movieCard.insertAdjacentHTML("afterbegin", html);
        genre.forEach((element) => {
          let gen = document.createElement("span");
          gen.innerHTML = `${element.name}`;
          document.querySelector(".genre").appendChild(gen);
        });
        setTimeout(() => {
          movieCard.style.display = "flex";
          document.body.style.overflow = "hidden";
          let hieght = window.scrollY + 65;
          movieCard.style.top = `${hieght}px`;
        }, 100);
        document.querySelector(".close").addEventListener("click", () => {
          movieCard.style.display = "none";
          document.body.style.overflow = "unset";
        });
        darkModeColor();
      })
      .catch((err) => console.error(err));
  }
});

darkMode.addEventListener("click", () => {
  if (darkModeStatues % 2) {
    document.querySelector(".darkmode .fa-solid").classList.toggle("fa-sun");
    document.querySelector(".darkmode .fa-solid").classList.toggle("fa-moon");
    darkModeStatues += 1;
  } else {
    document.querySelector(".darkmode .fa-solid").classList.toggle("fa-sun");
    document.querySelector(".darkmode .fa-solid").classList.toggle("fa-moon");
    darkModeStatues += 1;
  }
  darkModeColor();
});
function darkModeColor() {
  if (darkModeStatues % 2) {
    document.querySelector(".container").style.backgroundColor =
      "var(--dark-mode-primary)";
    document.querySelector("nav").style.backgroundColor =
      "var(--dark-mode-secondry)";
    document.querySelectorAll("a").forEach((button) => {
      button.style.color = "white";
    });
    document.querySelectorAll("i").forEach((button) => {
      button.style.color = "var(--dark-mode-secondry)";
    });
    document.querySelectorAll("button").forEach((button) => {
      button.style.backgroundColor = "var(--dark-mode-secondry)";
      button.style.color = "white";
    });
    document.querySelectorAll("h1").forEach((button) => {
      button.style.color = "white";
    });
  } else {
    document.querySelector(".container").style.backgroundColor =
      "var(--light-mode-primary)";
    document.querySelector("nav").style.backgroundColor =
      "var(--light-mode-secondry)";
    document.querySelectorAll("a").forEach((button) => {
      button.style.color = "black";
    });
    document.querySelectorAll("i").forEach((button) => {
      button.style.color = "var(--light-mode-secondry)";
    });
    document.querySelectorAll("button").forEach((button) => {
      button.style.backgroundColor = "var(--light-mode-secondry)";
      button.style.color = "black";
    });
    document.querySelectorAll("h1").forEach((button) => {
      button.style.color = "black";
    });
  }
}
