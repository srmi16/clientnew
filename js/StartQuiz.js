$(document).ready(() => {

    SDK.User.loadNav();

    function getElementByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const quizId = getElementByName('quizId');
    var quizQuestion = new Array();
    var correctAnswer = -1;
    var currentQuestion = 0;
    const Result = new Array();
    SDK.Question.getQuestion(quizId, (err, data) => {

        if (err) {
            console.log("Something went wrong")
        } else {
            quizQuestion = data;
            $('#TitleText').html(quizQuestion[currentQuestion].questionTitle);

            const questionId = quizQuestion[currentQuestion].questionId;
            var choice = new Array();
            const currentChoice = 0;

            SDK.Choice.getChoices(questionId, (err, data) => {
                if (err) {
                    console.log("something went wrong")
                } else {
                    choice = data;
                    var htmlChoice = "";
                    for (i = 0; i < choice.length; i++) {
                        if (choice[i].answer == 1) {
                            correctAnswer = i;
                        }

                        htmlChoice += '<div class="radio"> <label><input value=="Choice-' + i + '" type="radio" name="Choices">' + choice[i].choiceTitle + '</label> </div>';
                    }

                    $("#ChoiceCon").html(htmlChoice);


            }
        });

     }

    });

    $("#Continue").click(function () {
        if(!$('input [name=Choices]:checked').val()){
            window.alert("Choose a answer");
            return;

        }

        var UserChoice = $('input[name=Choices]:checked').val();
        var QuizIndex = UserChoice.split("-")[1];
        console.log(QuizIndex);
        console.log(correctAnswer);
        if(correctAnswer=QuizIndex) {
            Result[currentQuestion] = 1;

        }
        else {
            Result[currentQuestion]=0;
        }
        console.log(Result);
        if(quizQuestion.length > currentQuestion) {

            $("#TitleText").html(quizQuestion[currentQuestion].questionTitle);

            var questionId = quizQuestion[currentQuestion++].questionId;
            SDK.Choice.getChoices(questionId, (err, data) =>  {
                if (err) {
                    console.log("Something went wrong")

                } else {
                    choice = data;
                    var htmlChoice = "";
                    for (i = 0; i < choice.length; i++) {
                        if(choice[i].answer ==1) {
                          correctAnswer=i;
                        }

                        htmlChoice += '<div class="radio"> <label><input value="Choice-' + i + '" type="radio" name="Choices">' + choice[i].choiceTitle + '</label> </div>';

                    }
                    $("#ChoiceCon").html(htmlChoice);
                }
            });

        }

        else {
            $("#TitleText").html("Finished");
            var correctAnswerCount = 0;
            for (i = 0; i < Result.length; i++) {
                if(Result[i]==1) {
                    correctAnswerCount++;
                }
            }

            var endResult = "Total questions= " + Result.length + " ; Points = " + correctAnswerCount;
            $("#ChoiceCon").html(endResult);
            $("#Continue").hide();

        }

    });
});












































