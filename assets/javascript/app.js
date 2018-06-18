var firstKeyPress = false;
var questionCounter = 0;
var timer = 30;
var correct = 0;
var incorrect = 0;
var questionArray = [
    {
        question: "What country is named for its location on the equator?",
        correctAnswer: "Ecuador",
        answers: [
            {
                answer: "Brazil",
                value: false,
            },
            {
                answer: "Portugal",
                value: false,
            },
            {
                answer: "Ecuador",
                value: true,
            },
            {
                answer: "Peru",
                value: false,
            }
        ]
    },  
    {
        question: "The Bill of Rights contains how many of the first amendments to the United States Constitution?",
        correctAnswer: "10",
        answers: [
            {
                answer: "5",
                value: false,
            },
            {
                answer: "8",
                value: false,
            },
            {
                answer: "10",
                value: true,
            },
            {
                answer: "12",
                value: false,
            }
        ]
    },
    {
        question: "What is the English translation for the name of the German automaker Volkswagen?",
        correctAnswer: "People's Car",
        answers: [
            {
                answer: "People's Car",
                value: true,
            },
            {
                answer: "Old Wagon",
                value: false,
            },
            {
                answer: "True Style",
                value: false,
            },
            {
                answer: "German Auto",
                value: false,
            }
        ]
    }, 
    {
        question: "With twelve Oscar nominations and three wins, who is the most nominated male actor in Academy Awards history?",
        correctAnswer: "Jack Nicholson",
        answers: [
            {
                answer: "Brad Pitt",
                value: false,
            },
            {
                answer: "Julia Roberts",
                value: false,
            },
            {
                answer: "Morgan Freeman",
                value: false,
            },
            {
                answer: "Jack Nicholson",
                value: true,
            }
        ]
    }, 
    {
        question: "What is the Spanish word for meat?",
        correctAnswer: "Carne",
        answers: [
            {
                answer: "Meato",
                value: false,
            },
            {
                answer: "Carne",
                value: true,
            },
            {
                answer: "Bistec",
                value: false,
            },
            {
                answer: "Frijoles",
                value: false,
            }
        ]
    }, 
]

var endQuestion = function() {
    $(".timeRemaining").text(timer);
    timer = 30;
    questionCounter++;
    $(".answers").empty();
    $(".question").empty();
    $(".timeRemaining").empty();
    setTimeout(newQuestion, 1000);
}

var endGame = function() {

    $(".timeRemaining").empty;
    $(".answers").empty().html("<div>Correct: <span class='correct'></span><br></br>Incorrect: <span class='incorrect'></span></div>");
    $(".correct").text(correct);
    $(".incorrect").text(incorrect);
    $(".question").empty().text("Press Any Key To Begin");
    firstKeyPress = false;
    questionCounter = 0;
    timer = 30;
    correct = 0;
    incorrect = 0;

}

var alertCorrect = function() {
    var alert = $("<div>");
    $(alert).attr("class","alert alert-success");
    $(alert).text("Correct!")
    $(".alertSpace").append(alert);
}

var alertIncorrect = function() {
    var alert = $("<div>");
    $(alert).attr("class","alert alert-danger");
    $(alert).text("Incorrect. :(")
    $(".alertSpace").append(alert);
}

var alertTimeout = function() {
    var alert = $("<div>");
    $(alert).attr("class","alert alert-danger");
    $(alert).text("You Ran Out Of Time. :(")
    $(".alertSpace").append(alert);
}
var newQuestion = function() {
    var buttonPressed = false;
    $(".alertSpace").empty();

    if (correct + incorrect === questionArray.length) {
        console.log("done");
        clearInterval(timerSet);
        endGame();
    }
    else {
        setTimeout(function(){
            if (questionCounter === questionArray.length) {
                questionCounter = 0;
            }
            $(".question").text(questionArray[questionCounter].question);
            for (i=0;i < 4; i++) {
                var answerDiv = $("<div>");
                var answer = $("<button>").text(questionArray[questionCounter].answers[i].answer);
                $(answer).attr("class","btn btn-info");
                $(answer).attr("value",questionArray[questionCounter].answers[i].value);
                $(".answers").append(answerDiv);
                $(answerDiv).append(answer);

            }
  
        },1000)
        
        var timerSet = setInterval(function() {
            timer--;
            $(".timeRemaining").css("color", "black");
            $(".timeRemaining").text(timer);
            
            if (timer < 10) {
                $(".timeRemaining").css("color", "red");
            }

            if (timer === 0) {
                clearInterval(timerSet);
                alertTimeout();
                incorrect++;
                setTimeout(function() {
                endQuestion();
                }, 1000)
            }
            $("button").on("click", function(){
                if (buttonPressed === false) {
                    clearInterval(timerSet);
                    console.log(this.value);
                    if (this.value == "true") {
                        correct++
                        console.log("correct: " + correct);
                        buttonPressed = true;
                        alertCorrect();
                        setTimeout(function() {
                            endQuestion();
                        }, 1000)  
                    }
                    else {
                        incorrect++
                        console.log("incorrect: " + incorrect);
                        buttonPressed = true;
                        $("button[value='true']").attr("style","border: red solid 3px");
                        $("button[value='false']").attr("class","btn btn-info disabled");
                        alertIncorrect();
                        setTimeout(function() {
                            endQuestion();
                        }, 2000)  
                    }
                }
            })
        }, 1000)
    }   
   

   
}

$(".question").text("Press Any Key To Begin");

document.onkeyup = function() {
    if (firstKeyPress === false) {
        firstKeyPress = true;
        $(".answers").empty();
        $(".question").empty();
        newQuestion();       
    }
   else{}
}


