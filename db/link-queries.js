const pg = require('./knex')

function addNewUser(user, hash) {
  return pg('users').insert({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    password: hash,
    avatar: user.avatar
  })
}

function getUserByEmail(email) {
  return pg('users')
    .select()
    .where('email', email)
    .first()
}

function getUserById(id) {
  return pg('users')
    .select()
    .where('id', id)
    .first()
}

function getUserByUsername(username) {
  return pg('users')
    .select()
    .where('username', username)
    .first()
}

function addBet(body) {
  return pg('bet')
    .returning('id')
    .insert({
      opponent: body.opponent,
      title: body.title,
      terms: body.terms,
      consequences: body.consequences,
      bet_start_date: body.bet_start_date,
      bet_end_date: body.bet_end_date
  })
}

function addBetToJoinTable(betId, userId) {
  return pg('users_bet')
    .returning('id')
    .insert({
      users_id: userId,
      bet_id: betId,
      is_winner: false,
      is_proposer: false,
      is_acceptor: false
    })
}

function getActiveBetsByUserId(id) {
  return pg('users').select('*')
    .join('users_bet', 'users.id', 'users_bet.users_id')
    .join('bet', 'users_bet.bet_id', 'bet.id')
    .where('users.id', id);
}

function getCompletedBetsByUserId(id) {
  return pg('users').select('*')
    .join('users_bet', 'users.id', 'users_bet.users_id')
    .join('bet', 'users_bet.bet_id', 'bet.id')
    .where('users.id', id);
}

function editProfile(id, body) {
  return pg('users').where('id', id).update({
    first_name: body.first,
    last_name: body.last,
    username: body.username,
    email: body.email
  })
}

module.exports = {
  addNewUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getActiveBetsByUserId,
  getCompletedBetsByUserId,
  editProfile,
  addBet,
  addBetToJoinTable
}
