
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_bet').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_bet').insert([
        {
          bet_id: 1,
          users_id: 2,
          is_winner: true,
          is_acceptor:true,
          is_proposer: false
        },
        {
          bet_id: 2,
          users_id: 2,
          is_winner: false,
          is_acceptor:false,
          is_proposer: true
        },
        {
          bet_id: 3,
          users_id: 3,
          is_winner: false,
          is_acceptor:false,
          is_proposer: true
        },
        {
          bet_id: 4,
          users_id: 4,
          is_winner: true,
          is_acceptor:true,
          is_proposer: false
        }
      ]);
    });
};
