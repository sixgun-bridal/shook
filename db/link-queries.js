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

function editProfile(id, body) {
  return pg('users').where('id', '=', id).update({
    first_name: body.first,
    last_name: body.last,
    username: body.username,
    email: body.email
  })
}

module.exports = {
  getUserByEmail,
  getUserById,
  getActiveBetsByUserId,
  getCompletedBetsByUserId,
  editProfile
}
