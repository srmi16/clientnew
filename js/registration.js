$(document).ready(() => {

    SDK.User.loadNav();

    $("#sign-button").click(() => {

            const firstName = $("#inputFirstName").val();
            const lastName = $("#inputLastName").val();
            const regUsername = $("#inputRegUsername").val();
            const regPassword = $("#inputRegPassword").val();
            const regPasswordVerify =$("#inputRegPasswordVerify").val();


            if (!firstName || !lastName || !regUsername || !regPassword || !regPasswordVerify) {
                window.alert("Info missing")


            } else {
                if (regPassword.valueOf() === regPasswordVerify.valueOf()) {
                    SDK.User.create(firstName, lastName, regUsername, regPassword, (err, data) => {
                        if (err && err.xhr.status === 401) {
                            $(".form-group").addClass("has-error");
                        }
                        else if (err) {
                            console.log("Lortet virker ikke")
                        } else {
                            window.alert("Registation succesfull")
                            window.location.href = "login.html";

                        }

                    });

                }

            }
        }

    );

});