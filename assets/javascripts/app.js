$(document).ready(function(){
  //console.log("ready");

  $("#submit").on("click", function(event){
    event.preventDefault();
    var addButton = $("<button>");
    var input_entry = $("#input").val();
    console.log(input_entry);
    addButton.text(input_entry);
    addButton.attr("data-character", input_entry);
    $(".btn-List").append(addButton);
    addEvent();
  })

  function addEvent(){
    $("button").on("click",function(){
      var character = $(this).attr("data-character");
      var queryURL ="https://api.giphy.com/v1/gifs/search?q="+character+"&api_key=SfCF9Z6EujiYx3XUsOSL5693ZqIirCsK&limit=5";

      $.ajax({
        url: queryURL,
        method:"GET"
      }).done(function(response){
        var results = response.data;
        for(var i=0; i<results.length; i++){
          var characterDiv = $("<div>");
          var characterImage = $("<img>");
          characterImage.attr("src", results[i].images.fixed_height.url);
          // console.log(results[i].images.original_still.url);
          characterImage.attr("still", results[i].images.original_still.url);
          characterDiv.append(characterImage); 
          $("#gifList").prepend(characterDiv);
          $(characterImage).on("click", function(){
            $(this).attr("src", $(this).attr("still"));
          });
        }

      }); //end of ajax
    });
  }// function addEvent();

  addEvent();
  // /playNpause();

  // function playNpause(){
  //   $(characterDiv).each(function(e){
  //     console.log(characterDiv);
  //     // var src = $(e).attr('src');
  //     // $(e).hover(function(){
  //     //   $(this).attr('src', src.replace('.gif', '_anim.gif'));
  //     // }, function(){
  //     //   $(this).attr('src', src);
  //     // });
  //   });
  // }
 
});// end of document
