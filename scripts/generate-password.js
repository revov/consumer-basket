/* eslint-disable @typescript-eslint/no-var-requires */
const prompt = require('password-prompt');
const bcrypt = require('bcrypt');

prompt('password: ', { method: 'hide' }).then((password) => {
  const hash = bcrypt.hashSync(`${password}`, 12);
  console.log(hash);
});
