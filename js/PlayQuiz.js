$(document).ready(() => {

    SDK.User.loadNav();

    SDK.Courses.getCourses((err, data) => {

        if (err) {
            console.log("something went wrong")
        }else {
            var select = document.getElementById("PlayQuizzes");

            var el = document.createElement("option");
            el.textContent = "Choose a course";
            el.value = -1;
            select.appendChild(el);

            for (var i = 0; i < data.length; i++) {
                var opt = data[i];
                var el = document.createElement("option");
                el.textContent = opt.courseTitle;
                el.value = opt.courseId;
                select.appendChild(el);
            }

        }
    });

    $('#PlayQuizzes').on('change', function () {
        var quizzes = SDK.Quiz.getQuiz(this.value, (err, data) => {

            if (err) {
                console.log("Failed in getting")
            } else {
                console.log(data);

                var tbody = $('#quizTable tbody'),
                    props = ["quizId", "quizTitle", "courseId"];
                $.each(data, function (i, quizTable) {
                    var tr = $('<tr>');
                    $('<td>').html(quizTable['quizTitle']).appendTo(tr);


                    $('<td>').html('<input type="button" data-quizId="'+quizTable['quizId']+'" name= "StartButton" value="Play quiz"/>').appendTo(tr);
                    tbody.append(tr);


                });

                $('input [name="StartButton"]').click(function() {
                    var quizId = $(this).attr('data-quizId');

                    location.href="http://localhost:63342/clientnew/PlayQuiz.html?quizId=" +quizId;


                });

            }
        })

    })


});