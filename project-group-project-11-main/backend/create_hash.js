// example script for hash generation
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = 'nonono';

// editor = yesyesyes
// viewer = nonono

bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    console.log('Hash: ', hash);
  })
  .catch((err) => console.error(err.message));
