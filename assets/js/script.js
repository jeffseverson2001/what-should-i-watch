let movieAPI = "https://api.themoviedb.org/3/movie/505/recommendations?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US&page=1";
let movieGenres = "https://api.themoviedb.org/3/genre/movie/list?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US";

function getAPIMovieData(movieAPI) {
    fetch(movieAPI)
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



getAPIMovieData(movieGenres);
getAPIMovieData(movieAPI);
