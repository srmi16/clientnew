const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },



    Question: {


        getQuestion: (quizId, cb) => {
            SDK.request({
                url: "/question/" + quizId,
                method: "GET",



            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });


        },
        create: (question, cb) => {
            SDK.request({
                method: "POST",
                url: "/question",
                data: {
                    quizId: question.quizId,
                    questionTitle: question.questionTitle

                },

            },
                (err, data) => {

                if (err) return cb(err);
                data = JSON.parse(data);
                SDK.Storage.persist("questionId", data.questionId);

                cb(null, data);
            });
        },
    },

    Choice: {

        getChoices: (questionId, cb) => {
            SDK.request({
                url: "/choice/" + questionId,
                method: "GET"
            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });
        },

        create: (questionId, choiceTitle, answer, cb) => {
            SDK.request({
                method: "POST",
                url: "/choice",
                data: {
                    questionId: questionId,
                    choiceTitle: choiceTitle,
                    answer: answer
                },
            },
                (err, data) => {

                if (err) return cb (err);

                cb(null, data)
            });
        },
    },


    Quiz: {

        getCourses: (cb) => {
            SDK.request({method: "GET", url: "/courses"}, cb);

        },

        addQuiz: (quizTitle, courseId, cb) => {
            SDK.request({
                url: "/quiz",
                method: "POST",
                data: {
                    quizTitle: quizTitle,
                    courseId: courseId
                }

            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });

        },

        getQuiz: (courseId, cb) => {
            SDK.request({
                url: "/quiz/" + courseId,
                method: "GET"
            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });


        },

        deleteQuiz: (id, cb) => {
            SDK.request({
                url: "/quiz/" + id,
                method: "DELETE"

            }, (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });

        }


    },


  User: {
    findAll: (cb) => {
      SDK.request({method: "GET", url: "/user"}, cb);
    },

      getUsers: (cb) => {
      SDK.request({
          method: "GET",
          url: "/user/{id}",
      }, (err, user) => {
        if (err) return cb(err);
        SDK.Storage.persist("User", user);
        cb(null, user);
      });

      },
    current: () => {
      return {
        userId: SDK.Storage.load("userId"),
        username: SDK.Storage.load("username"),
        firstName: SDK.Storage.load("firstName"),
        lastName: SDK.Storage.load("lastName"),
        type: SDK.Storage.load("type"),
    }
    },
    logOut: () => {

      SDK.Storage.remove("userId");
      SDK.Storage.remove("username");
      SDK.Storage.remove("firstName");
      SDK.Storage.remove("lastName");
      SDK.Storage.remove("type");
      window.location.href = "login.html";
    },
    login: (username, password, cb) => {
      SDK.request({
        data: {
          username: username,
          password: password
        },
        url: "/user/login",
        method: "POST"
      }, (err, data) => {

        //On login-error
        if (err) return cb(err);

        data = JSON.parse(data);
        SDK.Storage.persist("userId", data.userId);
        SDK.Storage.persist("username", data.username);
        SDK.Storage.persist("firstName", data.firstName);
        SDK.Storage.persist("lastName", data.lastName);
        SDK.Storage.persist("type", data.type);

        cb(null, data);

      });
    },

    create: (firstName, lastName, regUsername, regPassword, cb) => {
      SDK.request({
          data: {
            firstName: firstName,
            lastName: lastName,
            username: regUsername,
            password: regPassword,
            type: 1
          },
          url: "/user",
          method: "POST"
      }, (err, data) => {

        //on create-user - error
          if (err) return cb(err);


          cb(null, data);


      });
    },
      createAdmin: (firstName, lastName, regUsername, regPassword, cb) => {
      SDK.request({
          data: {
              firstName: firstName,
              lastName: lastName,
              username: regUsername,
              password: regPassword,
              type: 2
              },
              url: "/user",
              method: "POST"
          }, (err, data) => {

              //on create-user - error
              if (err) return cb(err);


              cb(null, data);


          });
      },

      delete: (id, cb) => {
        SDK.request({
            method: "DELETE",
            url: "/user/" + id,
        },
            (err) => {
            if (err) return cb(err);

            cb(null);
            });
      },

      loadNav: (cb) => {
          $("#nav-container").load("nav.html", () => {
              const currentUser = SDK.User.current();
              console.log(currentUser);
              if (currentUser.userId !== null && currentUser.type == 1) {
                  $(".navbar-nav").html(`
              <li><a href="index.html">Home</a></li>
              <li><a href="profil.html">Profile</a></li>
              <li><a href="PlayQuiz.html">Play</a></li>   
             
          `);
              } else if (currentUser.userId !== null) {
                  $(".navbar-nav").html(`
             <li><a href="index.html">Home</a></li>
             <li><a href="profil.html">Profile</a></li>
             <li><a href="users.html">Users</a></li>
             <li><a href="Quizzes.html">Quizzes</a></li>
             <li><a href="PlayQuiz.html">Play</a></li>
            
            
          `);
              } else {

                  $(".navbar-right").html(`
             <li><a href="login.html">Log out<span class="sr-only">(current)</span></a></li>
          `);
              }

              $("#logout-link").click(() => SDK.User.logOut());
              cb && cb();
          });
      }
  },
  Storage: {
    prefix: "BookStoreSDK",
    persist: (key, value) => {
      window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: (key) => {
      const val = window.localStorage.getItem(SDK.Storage.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e) {
        return val;
      }
    },
    remove: (key) => {
      window.localStorage.removeItem(SDK.Storage.prefix + key);
    }
  }
};