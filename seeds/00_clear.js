
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_bet').del()
    .then(function() {
      return knex('comment').del();
    }).then(function() {
      return knex('bet').del();
    }).then(function() {
      return knex('users').del()
      .then(function() {
    });
  });
};
