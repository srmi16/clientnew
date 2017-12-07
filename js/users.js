$(document).ready(() => {

    $("#sign-Admin").click(() => {

        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const regUsername = $("#inputRegUsername").val();
        const regPassword = $("#inputRegPassword").val();
        const regPasswordVerify =$("#inputRegPasswordVerify").val();


        if (!firstName || !lastName || !regUsername || !regPassword || !regPasswordVerify) {
            window.alert("Info missing")


        } else {
            if (regPassword.valueOf() === regPasswordVerify.valueOf()) {
                SDK.User.createAdmin(firstName, lastName, regUsername, regPassword, (err, data) => {
                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("has-error");
                    }
                    else if (err) {
                        console.log("Lortet virker ikke")
                    } else {
                        window.alert("Registation succesfull")
                        window.location.href = "users.html";

                    }

                });

            }

        }
        }

    );



    const userbody = $('#userbody');

    userbody.html("")
    SDK.User.findAll((err, users) => {

        users.forEach((user) => {

            userbody.append(`<tr><td>${user.userId}</td><td>${user.username}</td><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.type}<td><tr>`);

        });
    });
});