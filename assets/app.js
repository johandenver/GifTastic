// create function to load page before .js runs:

$(document).ready(function() {
    
// Create Variables for initial four gif categories which will load to the page:

var initialTopics = ["rocket", "star wars", "space", "star trek", "galaxy", "bowie", "martian"];

// Loop to add initial topics array to html as buttons using createButton function:

for (i = 0; i < initialTopics.length; i++) {
    createButton(initialTopics[i]);
}

// click event on gif button to have the gif images appear:

$(document).on("click", ".gif-button", function(){
    // captures the data name of the gif button being clicked:
    var gifs = $(this).attr("data-name");
    // captures the number of gifs the user has requested:
    var number = $("#search-amount").val().trim();
    // ensures the rating of the gifs are at least PG rated: 
    var rating = "PG";
    // call the gitGitData() to run the ajax from API:
    getGifData(gifs, number, rating);

}) 

// click event to change gif images from still to animated:

$(document).on("click", ".image-gif", function(){
    // set the attribute of the item to variable name:
    var state = $(this).attr("data-status");
    // if image-gif is in a still state, will switch to animated state:
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-status", "animate");
    }
    // if image-gif is in animated state, it will move back to still state:
    else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-status", "still");
    }
});


// Click event for "submit" button to capture input and create new gif button:

$("#submit-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-topics").val().trim().toLowerCase();
    //validation:
    if(gif !== "" & !initialTopics.includes(gif)){
        initialTopics.push(gif);
       // create next gif button:
        createButton(gif);   
    } else {
        $("#alert-message").slideDown("slow")
    }
    $("#gif-topics").val("");
  
});

$("#gif-topics").click(function(){
    $("#alert-message").slideUp("slow")
})


// This is the gitGifData function to pull from Giphy API using my Ajax key:0ni8MlatpXTG9gDcbcA823so5bLAKWUb:

function getGifData(gifs, number, rating) {
    //notes: 
    //var gif = $("gif-topics").val().trim();
    //var number = $("#search-amount").val().trim();
    //var rating = "PG"
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=0ni8MlatpXTG9gDcbcA823so5bLAKWUb&limit=" + number + "&rating=" + rating +"&lang=en";

    $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function(response) {
        //create variable name for the data response received from API:
        var gifResponse = response.data;
        // Log the resulting object
        console.log(gifResponse);
        $("#gif-view").empty();

        // loop through response array to find the neede items:
        for (let i=0; i < gifResponse.length; i++) {
            //new div for gifs:
            var gifsDiv = $("<div class='gif text-center'>");
            var imageGif;
            //create a rating element:
            ratingGif = $("<p>");
            //attach text to rating element:
            ratingGif.text("Gif rating is " + gifResponse[i].rating.toUpperCase());
            //create an image element for the gif:
            imageGif = $("<img>");
            //attache attributes and class:
            imageGif.attr("src", gifResponse[i].images.fixed_height_still.url);
            imageGif.attr("data-still", gifResponse[i].images.fixed_height_still.url);
            imageGif.attr("data-animate", gifResponse[i].images.fixed_height.url);
            //imageGif.attr("data-status", "still");
            imageGif.addClass("image-gif")
            imageGif.attr("alt", gifResponse[i].title);
            // append the elements to the gifs div created above:
            gifsDiv.append(imageGif, ratingGif);
            // prepend the above gifs div to the div id on the HTML page:
            $("#gif-view").prepend(gifsDiv);

        }
        
        
      });

};

// create the createButton function to create the dynamic buttons:

function createButton(gif){
    // dynamic created button in a variable:
    var gifButton = $("<button>");
    // add a class to button variable:
    gifButton.addClass("topic-btn rounded gif-button");
    // add an attribute to button variable:
    gifButton.attr("data-name", gif);
    // add text to button variable: 
    gifButton.text(gif);
    // Adding the button to the buttons-view div
    $("#gif-button").append(gifButton, " ");
    
};

});


// notes: 
// $("#search-input") is the id for the input field for the search topics
// $("#search-amount") is the id for the input field for the amount of gifs requested. 
// $("#button-view") is the id for where the dynamic created buttons append. 
// $("#gif-view") is the id for where the gifs from the API append. 

/* my first attempted method: 

function createButton(gif){

    $("#button-view").empty();

    for (i = 0; i < initialTopics.length; i++) {

        var gifButton = $("<button>");
        // add a class to button
        gifButton.addClass("topic-btn rounded");
        // add an attribute to button
        gifButton.attr("data-name", initialTopics[i]);
        
        // add text to button
        gifButton.text(initialTopics[i]);
        // Adding the button to the buttons-view div
        $("#button-view").append(gifButton, " ");
        
    };

};

$("#submit-button").on("click", function() {
    event.preventDefault();

    // This line grabs the input from the textbox
    var topic = $("#search-input").val().trim();

    // Add topic from the text input to the array
    initialTopics.push(topic);

    createButton();
});
*/