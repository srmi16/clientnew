$(document).ready(() => {

    SDK.User.loadNav();


    SDK.Question.findAll((err, question) => {


        question.forEach((question) => {
            var questionsTitle = question.questionTitle;

            var questionsId = question.questionId;
            console.log(questionsTitle);
            console.log(questionsId);
            $("table").append('<div id="${questionTitle"><p><b>${questionId</b></p></div>');


            SDK.Choice.findAll(questionsId, (err, choice) => {

                var choice = choice;

                choice.forEach((choice) => {
                    $(`#${questionId}`).append(`<p><input> type="radio" class="choiceAnswer" name="option${questionsId} value="${choiceAnswer}">${choice.choiceTitle} </p>`);
                });
            });
        });

    });




});