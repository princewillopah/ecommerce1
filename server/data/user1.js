const bcrypt = require('bcryptjs')
const users = [
    {
      name: 'princewill opah',
      role: 'admin',
      email: 'princewillopah@gmail.com',
      password: bcrypt.hashSync('pppppp',10)
     
    },
    {
        name: 'Adam Snith',
        role: 'subscriber',
        email: 'popo@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Paul Bothman',
        role: 'subscriber',
        email: 'johnnC@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Arethar Fishman',
        role: 'subscriber',
        email: 'pola@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },{
        name: 'Adam Snith',
        role: 'subscriber',
        email: 'jude@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Greg Bothman',
        role: 'subscriber',
        email: 'greg@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'Anthony Fishman',
        role: 'subscriber',
        email: 'tony@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      }, {
        name: 'paul ebony',
        role: 'subscriber',
        email: 'ebony@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },{
        name: 'grace Atabor',
        role: 'subscriber',
        email: 'graceAtabor@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'kembor atalaye',
        role: 'subscriber',
        email: 'kb@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      },
      {
        name: 'pablo',
        role: 'subscriber',
        email: 'pl@gmail.com',
        password: bcrypt.hashSync('pppppp',10)
       
      }
   
  ]
  
  module.exports = users
  