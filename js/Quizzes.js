$(document).ready(() => {

    SDK.User.loadNav();

    SDK.Quiz.getCourses((err, data) => {

        if (err) {
            console.log("something went wrong")
        } else {
            const select = document.getElementById("PlayQuizzes");


            //Drop-down stackowerflow
            const el = document.createElement("option");
            el.textContent = "Choose your course";
            el.value = -1;
            select.appendChild(el);

            for (var i = 0; i < data.length; i++) {
                const opt = data[i];
                const el = document.createElement("option");
                el.textContent = opt.courseTitel;
                el.value = opt.courseId;
                select.appendChild(el)
            }

        }
    });


    $('#PlayQuizzes').on('change', function() {
        const quizzes = SDK.Quiz.getQuiz(this.value, (err, data) => {

            if (err) {
                console.log("Failed in getting course")
            } else {
                console.log(data);

                const tbody = $('#quizTable tbody'),
                    props = ["quizId", "quizTitle", "courseId"];
                $.each(data, function (i, quizTable) {
                    const tr = $('<tr>');
                    $('<td>').html(quizTable["quizTitle"]).appendTo(tr);
                    $('<td>').html(quizTable["quizId"]).appendTo(tr);
                    tbody.append(tr);



                })

                //Delete QUIZ

                $("#deleteQuiz-button").click(() => {

                    const deleteQuizID = $("#inputDeleteQuiz").val();

                    if (confirm("Are you sure you want to delete the quiz?"));
                    SDK.Quiz.deleteQuiz(deleteQuizID,(err) => {

                        if (err) {
                            window.alert("Not removed")
                        } else {
                            window.alert("Quiz has been deleted")
                            window.location.href = "Quizzes.html";

                        }

                    });
                });




        }



        })

    })

});