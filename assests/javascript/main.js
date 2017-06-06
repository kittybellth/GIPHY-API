$(document).ready(function(){

	// creating array for button
	var gifArr = ["dog", "cat", "bird"];


	function init() {

		var i;

		for (i=0; i < gifArr.length; i++) {

			var gifBtn = $("<button>");
			var remBtn = $("<button>");
			var editBtn = $("<button>");
			var saveBtn = $("<button>");
			var newInput = $("<input>");

			// adding class, attribute and text to each button
			gifBtn.addClass("gif-btn btn-primary");
			gifBtn.attr({"value":gifArr[i],
						"type":"button"});
			gifBtn.text(gifArr[i]);

			// adding class, attribute and text to each remove button
			remBtn.addClass("remove btn-danger");
			remBtn.attr({"number": i,
						"title":"remove!"});
			remBtn.text("x");

			// adding class, attribute and text to each edit button
			editBtn.addClass("edit btn-warning");
			editBtn.attr({"number": i,
						 "title": "edit!"});
			editBtn.html("<i class='fa fa-pencil' aria-hidden='true'></i>")

			// adding class, attribute and text to each save button
			saveBtn.addClass("save btn-success hide");
			saveBtn.attr({"number": i,
						 "title": "save!"});
			saveBtn.html("<i class='fa fa-floppy-o' aria-hidden='true'></i>")

			// adding class and attribute to each input
			newInput.addClass("newWord hide");
			newInput.attr({"number": i,
						 "value":"",
						 "type": "text"});

			// appending all those element to the div
			$(".button").append(gifBtn, newInput, remBtn, editBtn,  saveBtn);

		};
			edit();
			save();
			remove();
			ajaxTriggered();
	};

	init();

	// handling funtion to push text that user type in input inside array
		$("#submit").on("click", function() {

			// preventing browser reload the page when user click submit button
			event.preventDefault();

			// clearing the div before adding new button to prevent
			// generating repeating button
			$(".button").empty();

			// grabing the text inside input
			var gifText = $("#animation-input").val().trim();

				if(gifText === ""){
					alert("Please type name on something")
					init();
				}

				else {

					// pushing text inside gifArr
					gifArr.push(gifText);

					// calling render button each time when user clicks submit
					init();

					// clearing text each time when using clicks submit
					$("#animation-input").val("");

					console.log(gifArr);
				}
		});

		function edit(){
			$(".edit").on("click", function(){

				event.preventDefault();

				n = $(this).attr('number');

				$(".gif-btn").eq(n).addClass("hide");
				$(".remove").eq(n).addClass("hide");
				$(this).addClass("hide");
				$(".newWord").eq(n).removeClass("hide").attr("value", gifArr[n]);
				$(".save").eq(n).removeClass("hide");

			});
		};


		function save() {
			$(".save").on("click", function(){

				event.preventDefault();

				i = $(this).attr('number');

				word = $(".newWord").eq(i).val().trim();

				gifArr.splice(i, 1,  word);

				console.log(gifArr);

				$(".gif-btn").eq(i).removeClass("hide").text(word).val(word);
				$(".remove").eq(i).removeClass("hide");
				$(".edit").eq(i).removeClass("hide");
				$(".newWord").eq(i).addClass("hide");
				$(this).addClass("hide");

			});
		};

		function remove(){
			$(".remove").on("click", function(){

				event.preventDefault();

				i = $(this).attr('number');

				gifArr.splice(i, 1);

				console.log(gifArr);

				$(".button").empty();
				init();

			});
		};

		function ajaxTriggered(event) {
			$(".gif-btn").on("click", function(){

				$(".display").empty();

				var animation = $(this).attr("value");
				var queryURL  = "https://api.giphy.com/v1/gifs/search?q=" +
        						animation + "&api_key=dc6zaTOxFJmzC&limit=10";

        		 $.ajax({
          		url: queryURL,
          		method: "GET"
        		})
	        		// After data comes back from the request
			        .done(function(response) {
			          console.log(queryURL);
			          console.log(response);

			         var results = response.data;

				         for (var i = 0; i < results.length; i++) {
				         	var resultsDiv = $("<div>");
				         	var resultsP = $("<p>").text("Rating : " + results[i].rating).css("font-weight", "bolder");
				         	var resultsImg = $("<img>");

				         	resultsDiv.addClass("col-md-4 animation");
				         	resultsImg.attr({"src": results[i].images.fixed_height_still.url,
				         					 "data-animation": results[i].images.fixed_height.url,
				         					 "data-still": results[i].images.fixed_height_still.url,
				         					 "data-state": "still"
				         					});
				         	resultsImg.addClass("img-animation hvr-grow");

				         	$(".display").append(resultsDiv);
				         	resultsDiv.append(resultsP, resultsImg);


				         }

				            $(".img-animation").on("click", function(){
				            		var state = $(this).attr("data-state");
					        	if (state === "still"){

					        		$(this).attr("src", $(this).attr("data-animation"));
					        		$(this).attr("data-state", "animate");
					        	}
					        	else {
					        		$(this).attr("src", $(this).attr("data-still"));
					        		$(this).attr("data-state", "still");
					        	}

				         });

				            // more option with user experience with mouseover and out

				         //    $(".img-animation").on("mouseover", function(){

					        //  	$(this).attr("src", $(this).attr("data-animation"));
				         // });

				         //    $(".img-animation").on("mouseout", function(){

					        //  	$(this).attr("src", $(this).attr("data-still"));
				         // });
			         });
			});
		};

});
