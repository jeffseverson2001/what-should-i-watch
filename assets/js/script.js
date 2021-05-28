//  Get HTML Elements
let buttonBlock = $(".buttons");
let drinkDiv = $("#displayDrink");



//  Place Movie Data On Page
function renderMovieData(data, genreIDs) {
    let cardSection = $("#card-section");
    //console.log(cardSection);
    console.log(data);
    //console.log(genreIDs);

    $("#card-section").html("<p class=\"subtitle is-3\">Your Recommendations</p>");

    let baseImageURL = "https://image.tmdb.org/t/p/w92";

    /*
        TMBD Poster Sizes
            "poster_sizes": [
            "w92",
            "w154",
            "w185",
            "w342",
            "w500",
            "w780",
            "original"
            ],
    */

    //  Set pages for Back and Next Buttons
    let currentPage = data.page;
    let totalPages = data.total_pages;

    let pageUpValue = currentPage + 1;
    let pageDownValue = currentPage - 1;

    //  Make sure Next Button value does not exceed total number of pages
    if (currentPage === data.total_pages) {
        pageUpValue = data.total_pages;
    }

    //  Make sure Back Button value does not drop below 1
    if (currentPage === 1) {
        pageDownValue = 1;
    }

    //  Create Back and Next buttons
    let pageUpButton = $("<button></button>");
    pageUpButton.attr("id", "pageUpButton");
    pageUpButton.attr("value", pageUpValue);
    pageUpButton.attr("class", "button is-link is-rounded is-flex-wrap-nowrap");
    pageUpButton.append("Next");

    let pageDownButton = $("<button></button>");
    pageDownButton.attr("id", "pageDownButton");
    pageDownButton.attr("value", pageDownValue);
    pageDownButton.attr("class", "button is-link is-rounded is-flex-wrap-nowrap");
    pageDownButton.append("Back");

    //  Page 1 of X display
    let pageDisplay = $("<p></p>");
    pageDisplay.text("Page: " + currentPage + " of " + totalPages + " ");

    //  Add Buttons to card-content div
    pageDownButton.appendTo(pageDisplay);
    pageUpButton.appendTo(pageDisplay);

    pageDisplay.appendTo(cardSection);


    //  Loop through API movie results
    for (i = 0; i < data.results.length; i++) {

        //  Create div media-content for movie
        let cardDiv = $("<div></div>");
        cardDiv.attr("class", "card mb-2");

        let mediaDiv = $("<div></div>");
        mediaDiv.attr("class", "card-content media");

        let mediaLeftDiv = $("<div></div>");
        mediaLeftDiv.attr("class", "media-left");

        let figureImage = $("<figure></figure>");
        figureImage.attr("class", "image is-100x150");

        let movieImage = $("<img />");
        if (data.results[i].poster_path) {
            movieImage.attr("src", baseImageURL + data.results[i].poster_path);
        } else {
            movieImage.attr("src", "");
        }
        movieImage.attr("alt", data.results[i].title + " Poster Image");

        let mediaRightDiv = $("<div></div>");
        mediaRightDiv.attr("class", "media-content");

        //  Create save movie button
        let saveButton = $("<button></button>");
        saveButton.attr("class", "button is-link is-rounded is-flex-wrap-nowrap");
        //  Steve - I think we need to add the JSON string to send to local storage here.
        saveButton.attr("value", data.results[i].id);
        saveButton.append("Save");

        let mediaTitle = $("<p></p>");
        mediaTitle.attr("class", "title is-4 is-flex is-justify-content-space-between");
        //mediaTitle.append(data.results[i].title);
        //mediaTitle.append(" ::: id: " + data.results[i].id);

        let mediaTitleLink = $("<a></a>");
        mediaTitleLink.attr("id", "movieDetails" + i);
        //mediaTitleLink.attr("class", "title is-4 is-flex is-justify-content-space-between");
        mediaTitleLink.attr("href", "#");
        mediaTitleLink.attr("value", data.results[i].id);
        mediaTitleLink.append(data.results[i].title);
        mediaTitleLink.append(" ::: id: " + data.results[i].id);
        mediaTitleLink.appendTo(mediaTitle);

        let mediaContent = $("<p></p>");
        mediaContent.attr("class", "content is-6");
        mediaContent.append(data.results[i].overview);


        //  Place movie elements to card-content div
        $(movieImage).appendTo(figureImage);
        $(figureImage).appendTo(mediaLeftDiv);

        $(saveButton).appendTo(mediaTitle);
        $(mediaTitle).appendTo(mediaRightDiv);
        $(mediaContent).appendTo(mediaRightDiv);

        $(mediaLeftDiv).appendTo(mediaDiv);
        $(mediaRightDiv).appendTo(mediaDiv);

        $(mediaDiv).appendTo(cardDiv);
        cardSection.append(cardDiv);
    }

    //  Event listeners for back and next buttons
    $("#pageUpButton").click(function () {
        console.log($(this).val());
        movies = getAPIMovieData(genreIDs, $(this).val());
    });

    $("#pageDownButton").click(function () {
        console.log($(this).val());
        movies = getAPIMovieData(genreIDs, $(this).val());
    });

    //  This does not work right now - Jeff
    $("#movieDetails").click(function () {
        console.log($(this).val());
        getAPIMovieDetails($(this).val()) 
    });

}



//  Movie Detail Display
function renderMovieDetails(data) {
    let cardSection = $("#card-section");
    //console.log(cardSection);
    console.log(data);
    //console.log(genreIDs);

    $("#card-section").html("<p class=\"subtitle is-3\">Your Recommendations</p>");

    let baseImageURL = "https://image.tmdb.org/t/p/w92";

    cardSection.append(cardDiv);
}


//  Drink Modal
function renderDrink(data) {
    console.log(data);

    //  Get a new drink if over 6 Ingredients
    if (data.drinks[0].strIngredient7) {
        getAPIDrink();
    }

    //  Clear Current Drink
    $(drinkDiv).text("");

    $(drinkDiv).dialog("option", "title", "How To Make a " + data.drinks[0].strDrink);

    let drinkImage = $("<img />");
    //drinkImage.attr("style", "width: 80%;");
    if (data.drinks[0].strDrinkThumb) {
        drinkImage.attr("src", data.drinks[0].strDrinkThumb);
    } else {
        drinkImage.attr("src", "");
    }

    let drinkDetails = $("<p></p>");
    drinkDetails.append("Instructions: <br />");
    drinkDetails.append(data.drinks[0].strInstructions + "<br /><br />");
    drinkDetails.append("Best served in a " + data.drinks[0].strGlass);

    //  Get Drink Ingredients and 
    let drinkIngredients = $("<p></p>");
    drinkIngredients.append("Ingredients: <br />");
    if (data.drinks[0].strIngredient1) {
        if (data.drinks[0].strMeasure1) {
            drinkMeasure = data.drinks[0].strMeasure1 + ": ";
        } else {
            drinkMeasure = "";
        }
        drinkIngredients.append("1) " + drinkMeasure + data.drinks[0].strIngredient1 + "<br />");
    }
    if (data.drinks[0].strIngredient2) {
        if (data.drinks[0].strMeasure2) {
            drinkMeasure = data.drinks[0].strMeasure2 + ": ";
        } else {
            drinkMeasure = "";
        }
        drinkIngredients.append("2) " + drinkMeasure + data.drinks[0].strIngredient2 + "<br />");
    }
    if (data.drinks[0].strIngredient3) {
        if (data.drinks[0].strMeasure3) {
            drinkMeasure = data.drinks[0].strMeasure3 + ": ";
        } else {
            drinkMeasure = "";
        }
        drinkIngredients.append("3) " + drinkMeasure + data.drinks[0].strIngredient3 + "<br />");
    }
    if (data.drinks[0].strIngredient4) {
        if (data.drinks[0].strMeasure4) {
            drinkMeasure = data.drinks[0].strMeasure4 + ": ";
        } else {
            drinkMeasure = "";
        }
        drinkIngredients.append("4) " + drinkMeasure + data.drinks[0].strIngredient4 + "<br />");
    }
    if (data.drinks[0].strIngredient5) {
        if (data.drinks[0].strMeasure5) {
            drinkMeasure = data.drinks[0].strMeasure5 + ": ";
        } else {
            drinkMeasure = "";
        }
        drinkIngredients.append("5) " + drinkMeasure + data.drinks[0].strIngredient5 + "<br />");
    }
    if (data.drinks[0].strIngredient6) {
        if (data.drinks[0].strMeasure6) {
            drinkMeasure = data.drinks[0].strMeasure6 + ": ";
        } else {
            drinkMeasure = "";
        }
        drinkIngredients.append("6) " + drinkMeasure + data.drinks[0].strIngredient6 + "<br />");
    }
    drinkIngredients.append("<br/>");

    $(drinkDiv).append(drinkImage);
    $(drinkDiv).append(drinkIngredients);
    $(drinkDiv).append(drinkDetails);

}


//  Drink API
function getAPIDrink() {
    let drinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(drinkAPI)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            renderDrink(data);
        });
}



//  Fetch API Movie Data
function getAPIMovieData(genreIDs, newPage) {

    if (newPage) {
        currentPage = newPage;
    } else {
        currentPage = 1;
    }

    console.log("Page: " + currentPage);
    let movieAPI = "https://api.themoviedb.org/3/discover/movie?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + currentPage + "&primary_release_date.gte=2010-01-01&primary_release_date.lte=2020-12-31&vote_average.gte=7&with_genres=" + genreIDs + "";
    console.log(movieAPI);
    fetch(movieAPI)
        .then(function (response) {
            if (response.status !== 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(function (data) {
            renderMovieData(data, genreIDs);
        });
}


//  Movie Detail API 
function getAPIMovieDetails(id) {

    console.log("AT MOVE" + id);

    let movieDetailAPI = "https://api.themoviedb.org/3/movie/" + id + "?api_key=0d37b66cfda3facaf7d62b81d68fd669";
    fetch(movieDetailAPI)
    .then(function (response){
        if (response.status !== 200) {
            console.log(response.status);
        }
        return response.json();
    })
    .then(function (data) {
        renderMovieDetails(data);
    });
    //  "https://developers.themoviedb.org/3/getting-started/append-to-response";
}



//  Search Button Listener
$(".genreButton").click(function () {
    //console.log($(this).val());
    movies = getAPIMovieData($(this).val());
});


//  Drink Modal
$(function () {
    $("#displayDrink").dialog({
        modal: true,
        autoOpen: false,
        width: 375,
        height: 750
    });
    $("#getDrinkButton").click(function () {
        getAPIDrink();
        $("#displayDrink").dialog("open");
    });
});



