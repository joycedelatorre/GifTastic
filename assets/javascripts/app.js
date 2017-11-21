$(document).ready(function(){
  //console.log("ready");
  //event.preventDefault();

  $("#submit").on("click", function(event){
    event.preventDefault();
    var addButton = $("<button>");
    var input_entry = $("#input").val();
    console.log(input_entry);
    addButton.text(input_entry);
    addButton.attr("data-character", input_entry);
    // addButton.attr("id", btn);
    $(".btn-List").append(addButton);
    addEvent();
    //playNpause();
  })

  function addEvent(){
    $("button").on("click",function(){
      var character = $(this).attr("data-character");
      var queryURL ="https://api.giphy.com/v1/gifs/search?q="+character+"&api_key=SfCF9Z6EujiYx3XUsOSL5693ZqIirCsK&limit=5";

      $.ajax({
        url: queryURL,
        method:"GET"
      }).done(function(response){
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        for(var i=0; i<results.length; i++){
          var characterDiv = $("<div>");
          var characterImage = $("<img>");
          characterImage.attr("src", results[i].images.fixed_height.url);
          characterDiv.append(characterImage);
          $("#gifList").prepend(characterDiv);
        }
        $("characterDiv").each(function(){})
      }); //end of ajax
    });
  }// function addEvent();

  addEvent();
  // playNpause();

  // function playNpause(){
  //   $("button").each(function(e){
  //     var src = $(e).attr('src');
  //     $(e).hover(function(){
  //       $(this).attr('src', src.replace('.gif', '_anim.gif'));
  //     }, function(){
  //       $(this).attr('src', src);
  //     });
  //   });
  // }
 
});// end of document
