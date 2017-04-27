
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('comment').insert([
        {content: 'you suck!',
        bet_id: 1,
        users_id: 4
      },
        {content: 'This sucks!',
        bet_id: 2,
        users_id: 3
      },
        {content: 'Amazing!',
        bet_id: 3,
        users_id: 2
      },

      {content: 'This is crazy!',
      bet_id: 4,
      users_id: 1
      }
    ]);
  });
};
