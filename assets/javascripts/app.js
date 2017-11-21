$(document).ready(function(){
  //console.log("ready");
//create a button that has the same name of the user input at the form whenever we hit 
//the submit button
  $("#submit").on("click", function(event){  
    event.preventDefault();
    var addButton = $("<button>");
    var input_entry = $("#input").val();
    //console.log(input_entry);
    addButton.text(input_entry);
    addButton.attr("data-character", input_entry);
    $(".btn-List").append(addButton);
    addEvent();
// line 13 calls the event function so that the button created will be able to call the api.
  })

  function addEvent(){
    $("button").on("click",function(){
      var character = $(this).attr("data-character");
      var queryURL ="https://api.giphy.com/v1/gifs/search?q="+character+"&api_key=SfCF9Z6EujiYx3XUsOSL5693ZqIirCsK&limit=10";
      $.ajax({
        url: queryURL,
        method:"GET"
      }).done(function(response){
        var results = response.data;
        for(var i=0; i<results.length; i++){ 
//--------we loop into the response.data to create a div and place an image
          var rating = results[i].rating;
          //console.log(rating);
          var p = $("<p>").text("Rating: " + rating); // to get the ratings of each image 
          var characterDiv = $("<div>");
          var characterImage = $("<img>");
//--------console.log(results[i].images);
          characterImage.attr("src", results[i].images.original_still.url);
          characterImage.attr("still", results[i].images.original_still.url);
          characterImage.attr("animated",results[i].images.fixed_height.url);
          characterDiv.append(characterImage); 
          characterDiv.append(p);
          $("#gifList").prepend(characterDiv);
//-------
          $(characterImage).on("click", function(){
            var currentVal= $(this).attr("src");
            var animatedVal = $(this).attr("animated");
            var stillVal =$(this).attr("still");
            if(currentVal === stillVal){
              $(this).attr("src", animatedVal); 
            } else{
              $(this).attr("src", stillVal);
            }
          });
          
        }
      }); //end of ajax
    });
  }// function addEvent();

  addEvent();
});// end of document

