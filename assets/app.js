// create function to load page before .js runs:
$(document).ready(function(){

// Create Variables for initial four categories:
var categories = ["flying", "school", "coding", "pizza"];

// $("#search-input") is the id for the input field for the search topics
// $("#search-amount") is the id for the input field for the amount of gifs requested. 
// $("#button-view") is the id for where the dynamic created buttons append. 
// $("#gif-view") is the id for where the gifs from the API append. 

// function to pull from Giphy API using my Ajax key:0ni8MlatpXTG9gDcbcA823so5bLAKWUb:
/*
function apiPull() {

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var topic = "";

    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=0ni8MlatpXTG9gDcbcA823so5bLAKWUb&limit=5";

    $.ajax({
        url: queryUrl,
        method: "GET"
      })
        
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

      });

};

apiPull();

//apiPull();
*/
// function to manipulate the response from the API pull. needs to call function apiPull()
function processData(){
  // need to dynamically create a div:
  var gifArea = $("<div class='gify'>");

  var rating = $("<div class='rating'>");

  var stillGif = "data-state"
  stillGif.attr("data-state", "still")

  var animatedGif = "data-state"
  animatedGif.attr("data-state", "animated")

  img 

  gifArea.append(rating, stillGif, animatedGif)

$("#gif-view").append(gifArea);

//apiPull();

};

// function to create the dynamic buttons:
function createButton(){

    $("#button-view").empty();

    for (i = 0; i < categories.length; i++) {

        var movieButton = $("<button>");
        // add a class to button
        movieButton.addClass("topic-btn rounded");
        // add an attribute to button
        movieButton.attr("data-name", categories[i]);
        // add text to button
        movieButton.text(categories[i]);
        // Adding the button to the buttons-view div
        $("#button-view").append(movieButton);
        
    }

};

// create click event for "submit" button to capture input and then call function to add dynamic topic button with input.
$("submit-button").click(function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var input = $("#search-input").val().trim();

    // Add topic from the text input to the array
    categories.push(input);

    createButton();
});

/*
      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
*/

// create click event to pull the gif from API upon the topic button click:
//$("topic-btn").click()


// create click event on gifs to move from still to animated.
/*
$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
*/

createButton();


});








