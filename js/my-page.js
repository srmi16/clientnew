$(document).ready(() => {

  SDK.User.loadNav();SDK.User.getUsers();
  const currentUser = SDK.User.current();


  $(".page-header").html(`
    <h1>Hi, ${currentUser.firstName} ${currentUser.lastName}</h1>
  `);

  $(".img-container").html(`
    <img src="${currentUser.avatarUrl}" height="150"/>
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