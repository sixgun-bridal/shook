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

module.exports = {
  getUserByEmail,
  getUserById,
  getActiveBetsByUserId,
  getCompletedBetsByUserId
}
