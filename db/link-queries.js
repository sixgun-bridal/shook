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

function addBet(title, terms, consequences, bet_start_date, bet_end_date) {
  return pg('bet')
  .insert({
    title,
    terms,
    consequences,
    bet_start_date,
    bet_end_date
  })
}

function addUsersBetJoin(user, bet) {
  return pg('users_bet')
  .insert({
    users_id: user.id,
    bet_id: bet.id
  })
}

function getActiveBetsByUserId(id) {
  return pg('users').select('*').join('users_bet', 'users.id', 'users_bet.users_id').join('bet', 'users_bet.bet_id', 'bet.id').where('users.id', id);

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
  editProfile,
  addBet,
  addUsersBetJoin
}
