
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          first_name: 'Izabela',
          last_name: 'Louw',
          username: 'braga',
          password: 'password',
          email: 'password@braga.com',
        },
        {
          first_name: 'Justin',
          last_name: 'Hart',
          username: 'jhart',
          password: 'justinpass',
          email: 'justinhart90@gmail.com',
        },
      ]);
    });
};
