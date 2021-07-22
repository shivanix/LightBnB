const bcrypt = require('bcryptjs');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(user => {
      console.log("email: ", email, "password: ", password);

      console.log("user#########: ", user);
      
      const comparePassword = bcrypt.compareSync(password, user.password);

      console.log('Verification: ', comparePassword);

      if (bcrypt.compareSync(password, user.password)) {
        console.log("user: ", user);
        return user;
      }
      console.log("Verification of user/passwrd failed");
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    console.log("Accessing trying to login ######____---------");
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        console.log("Accessing login funct ######____-----");
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e =>{
       console.log("We got an eror-------------", e);
        res.send(e)

      });
  });
  
  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }
    
        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(e => res.send(e));
  });

  return router;
}