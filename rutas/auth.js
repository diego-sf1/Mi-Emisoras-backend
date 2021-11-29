const router = require('express').Router()
const bcryptjs = require('bcryptjs');
const connection = require('../database/db');

router.post('/login', async (req, res) => {
  try {
    //Data from the view
    const user_nickname = req.body.nickname;
    const password = req.body.password;
    
    //If fields are void send a error
    if (!user_nickname || !password) {
      return console.log(`Please provide a user and password`)
    }

    //Search and compare the password with bcrypt
    connection.query('SELECT * FROM users WHERE user_nickname = ?', [user_nickname], async (error, results)=>{
      if( results.length === 0 || ! (await bcryptjs.compare(password, results[0].user_pass)) ){
        res.send('User or password are incorrect')
      } else {
        //Setting the session
        req.session.loggedin = true;
				req.session.username = user_nickname;
        //TODO: Redirect to a view 
        res.send('User logged correctly')
      }
    })
  } catch (error) {
    console.log(`Error login the user: ${error}`)
  }
});

router.post('/register', async (req, res) => {
  try {
    //User data from request body
    const user_name = req.body.name;
    const user_nickname = req.body.nickname;
    const user_email = req.body.email;
    const user_password = req.body.password;
    const user_url = req.body.userurl;
    const user_country = req.body.country;
    const user_city = req.body.city;
    const user_registered = new Date().getTime();

    //Hashing the password
    const passHash = await bcryptjs.hash(user_password, 10) 

    //Insert data in DB
    connection.query('INSERT INTO users SET ?', {user_login:user_name, user_nickname: user_nickname, user_email:user_email, 
    user_pass: passHash, user_url: user_url, user_country: user_country, user_city: user_city, user_registered: user_registered
    }, (error, results)=>{
      if(error){console.log(error)}
        res.redirect('/')
     })
  } catch (error) {
    console.log(`Error with the register: ${error}`)
  }
});

module.exports = router
