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
]

var endQuestion = function() {
    $(".timeRemaining").text(timer);
    timer = 30;
    questionCounter++;
    $(".answers").empty();
    $(".question").empty();
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
var newQuestion = function() {
    var buttonPressed = false;
    
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
                $(answer).attr("class","btn btn-primary");
                $(answer).attr("value",questionArray[questionCounter].answers[i].value);
                $(".answers").append(answerDiv);
                $(answerDiv).append(answer);
            }
        },1000)
        
        var timerSet = setInterval(function() {
            timer--;
            $(".timeRemaining").text(timer);

            if (timer === 0) {
                clearInterval(timerSet);
                alert("You ran out of time! :(");
                incorrect++;
                endQuestion();
            }
            $("button").on("click", function(){
                if (buttonPressed === false) {
                    clearInterval(timerSet);
                    console.log(this.value);
                    if (this.value == "true") {
                        correct++
                        console.log("correct: " + correct);
                        buttonPressed = true;
                        alert("Correct!")
                        endQuestion();
                    }
                    else {
                        incorrect++
                        console.log("incorrect: " + incorrect);
                        buttonPressed = true;
                        $("button[value='true']").attr("style","border: red solid 3px")
                        setTimeout(function() {
                            alert("Incorrect. The Correct Answer is: " + questionArray[questionCounter].correctAnswer)                  
                            endQuestion();
                        }, 100)  
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


