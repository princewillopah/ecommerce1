const bcrypt = require('bcryptjs')
const users = [
    {
      name: 'Oni Taiwo',
      email: 'oni@gmail.com',
      password: bcrypt.hashSync('pppppp',10)
     
    },
    {
        name: 'Adam Snith',
        email: 'popo@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Paul Bothman',
        email: 'johnnC@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Arethar Fishman',
        email: 'pola@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },{
        name: 'Adam Snith',
        email: 'jude@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Greg Bothman',
        email: 'greg@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Anthony Fishman',
        email: 'tony@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      }, {
        name: 'paul ebony',
        email: 'ebony@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },{
        name: 'grace Atabor',
        email: 'graceAtabor@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'kembor atalaye',
        email: 'kb@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'pablo',
        email: 'pl@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      }
   
  ]
  
  module.exports = users
  