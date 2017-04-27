const pg = require('./knex')

function getUserByEmail(email) {
  return pg('users')
  .select()
  .where('email', '=', email)
}

function getUserById(id) {
  return pg('users')
  .select()
  .where('id', '=', id)
}

function addBet(bet) {
  return pg('bet')
  .insert(bet)
}

function getActiveBetsByUserId(id) {
  return pg('users')
  .select()
  .where('id', '=', id)
  .first()
}

function getCompletedBetsByUserId(id) {
  return pg('users')
  .select()
  .where('id', '=', id)
  .first()
}

function editProfile(id, first, last, username, email, password) {
  return pg('users').where('id', '=', id).update({
    first_name: first,
    last_name: last,
    username: username,
    email: email,
    password: password
  })
}

module.exports = {
  getUserByEmail,
  getUserById,
  getActiveBetsByUserId,
  getCompletedBetsByUserId,
  editProfile
}
