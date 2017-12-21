$(document).ready(() => {

    SDK.User.loadNav();

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    $("#NextQuestion").click(function () {
        if(!$('input[name=Choices]:checked').val()){
            alert("Please select a choice");
            return;
        }
        var UserChoice = $('input[name=Choices]:checked').val();
        var UserChoiceIndex = UserChoice.split("-")[1];
        console.log(UserChoiceIndex);
        console.log(CorrectChoice);
        if(CorrectChoice==UserChoiceIndex){
            QuizResult[currentQuestion]=1;
        }
        else{
            QuizResult[currentQuestion]=0;
        }
        console.log(QuizResult);
        if(questions.length > currentQuestion){

            $("#QuestionText").html(questions[currentQuestion].questionTitle);

            var questionId = questions[currentQuestion++].questionId;
            SDK.Choice.getChoices(questionId, (err,data) => {
                if (err) {
                    console.log("failed")
                } else {
                    choices = data;
                    var choicesHtml = "";
                    for (i = 0; i < choices.length; i++) {
                        if(choices[i].answer == 1){
                            CorrectChoice=i;
                        }
                        choicesHtml += '<div class="radio"> <label><input value="Choice-' + i + '" type="radio" name="Choices">' + choices[i].choiceTitle + '</label>  </div>';
                    }
                    $("#ChoiceContainer").html(choicesHtml);

                }
            });
        }
        else {
            $("#QuestionText").html("Quiz is done");
            var CorrectAnswerCount = 0;
            for (i = 0; i < QuizResult.length; i++) {
                if(QuizResult[i]==1){
                    CorrectAnswerCount++;
                }
            }
            var Result = " Total questions= "+ QuizResult.length + " ; Correct answers = " + CorrectAnswerCount;
            $("#ChoiceContainer").html(Result);
            $("#NextQuestion").hide();
        }


    });
    var quizId = getParameterByName('quizId');
    var questions = new Array();
    var CorrectChoice = -1;
    var currentQuestion = 0;
    var QuizResult = new Array();
    SDK.Question.getQuestion(quizId, (err, data) => {

        if (err) {
            console.log("failed")
        } else {
            questions = data;
            $("#QuestionText").html(questions[currentQuestion].questionTitle);

            var questionId = questions[currentQuestion].questionId;
            var choices = new Array();
            var currentChoice = 0;

            SDK.Choice.getChoices(questionId, (err,data) => {
                if (err) {
                    console.log("failed")
                } else {
                    choices = data;
                    var choicesHtml = "";
                    for (i = 0; i < choices.length; i++) {
                        if(choices[i].answer == 1){
                            CorrectChoice=i;
                        }
                        choicesHtml += '<div class="radio"> <label><input value="Choice-' + i + '" type="radio" name="Choices">' + choices[i].choiceTitle + '</label>  </div>';
                    }
                    $("#ChoiceContainer").html(choicesHtml);

                }
            });

        }
    });



















});
