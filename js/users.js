$(document).ready(() => {
    const userbody = $('#userbody');

    userbody.html("")
    SDK.User.findAll((err, users) => {

        users.forEach((user) => {

            userbody.append(`<tr><td>${user.userId}</td><td>${user.username}</td><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.type}<td><tr>`);

        });
    });
});