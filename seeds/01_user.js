
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
          password: '$2a$10$hm0vyNQXkIExx1Ca4UPAvuXrrBoAEeAzfXKI1uOnfwrYhfLyIsLF2',
          email: 'password@braga.com',
          bets_won:3,
          bets_lost:4
        },
        {
          first_name: 'Justin',
          last_name: 'Hart',
          username: 'jhart',
          password: '$2a$10$hm0vyNQXkIExx1Ca4UPAvuXrrBoAEeAzfXKI1uOnfwrYhfLyIsLF2',
          email: 'justinhart90@gmail.com',
          bets_won:3,
          bets_lost:4
        },
        {
        first_name: 'Thomas',
        last_name: 'Jones',
        username: 'tjones',
        password: '$2a$10$hm0vyNQXkIExx1Ca4UPAvuXrrBoAEeAzfXKI1uOnfwrYhfLyIsLF2',
        email: 'password1@jones.com',
        bets_won:3,
        bets_lost:4
      },
      {
        first_name: 'Tristan',
        last_name: 'Gilford',
        username: 'tgilford',
        password: '$2a$10$hm0vyNQXkIExx1Ca4UPAvuXrrBoAEeAzfXKI1uOnfwrYhfLyIsLF2',
        email: 'tristan90@gmail.com',
        bets_won:3,
        bets_lost:4
      },
      ]);
    });
};
