
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Izabela',
          last_name: 'Louw',
          username: 'braga',
          password: 'password',
          email: 'password@braga.com',
          bets_won:3,
          bets_lost:4
        },
        {
          first_name: 'Justin',
          last_name: 'Hart',
          username: 'jhart',
          password: 'justinpass',
          email: 'justinhart90@gmail.com',
          bets_won:3,
          bets_lost:4
        },
        {
        first_name: 'Thomas',
        last_name: 'Jones',
        username: 'tjones',
        password: 'password1',
        email: 'password1@jones.com',
        bets_won:3,
        bets_lost:4
      },
      {
        first_name: 'Tristan',
        last_name: 'Gilford',
        username: 'tgilford',
        password: 'tpass2',
        email: 'tristan90@gmail.com',
        bets_won:3,
        bets_lost:4
      },
      ]);
    });
};
