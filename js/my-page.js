$(document).ready(() => {

    SDK.User.loadNav();SDK.User.getUsers();
    const currentUser = SDK.User.current();



    $(".page-header").html(`
    <h2>Hi, ${currentUser.firstName} ${currentUser.lastName}</h2>
  `);

    $(".img-container").html(`
    <img src='https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg' height="170"/>
  `);

    $(".profile-info").html(`
    <dl>
        <dt>Name</dt>
        <dd>${currentUser.firstName} ${currentUser.lastName}</dd>
        <dt>Username</dt>
        <dd>${currentUser.username}</dd>
        <dt>ID</dt>
        <dd>${currentUser.userId}</dd>
        <dt>Type</dt>
        <dd>${currentUser.type}</dd>
     </dl>
  `);









});