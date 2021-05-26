//  Get HTML Elements
let buttonBlock = document.querySelector('.buttons');


let movieGenres = "https://api.themoviedb.org/3/genre/movie/list?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US";
getAPIMovieGenre();


async function getAPIMovieData(genreIDs) {
    let movieAPI = "https://api.themoviedb.org/3/discover/movie?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2010-01-01&vote_average.gte=8&with_genres=" + genreIDs + "";
    await fetch(movieAPI)
        .then(function (response) {
            if (response.status !== 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
        });
}

function getAPIMovieGenre() {
    let movieGenres = "https://api.themoviedb.org/3/genre/movie/list?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US";
    fetch(movieGenres)
        .then(function (response) {
            if (response.status !== 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            addGenreButtons(data);
            return data;
            //  Place Genre Select Buttons 

        });
}

function addGenreButtons(data) {
    console.log("Add Buttons: " + data.length);
    for (let i = 0; i < data.length; i++) {
        let baseButton = document.createElement("button");
        baseButton.setAttribute("class", "button is-link is-outlined is-fullwidth");
        baseButton.setAttribute("id", data[i].id);
        baseButton.setAttribute("name", data[i].name);
        //baseButton.setAttribute("id", "data.id");
        //baseButton.setAttribute("name", "data.name");
        baseButton.innerHTML = data[i].name;

        buttonBlock.appendChild(baseButton);
    }
}

//  OK to delete
//let genres = getAPIMovieGenre();
//console.log("Genres: " + genres);


//getAPIMovieData(movieGenres);
//getAPIMovieData(movieAPI);

//  Search Button Listener
$('#genreButton').click(function () {
    console.log("Click: " + $('#genreButton').val());
    movies = getAPIMovieData($('#genreButton').val());
});

$('#genreButton2').click(function () {
    console.log("Click: " + $('#genreButton2').val());
    movies = getAPIMovieData($('#genreButton2').val());
});



