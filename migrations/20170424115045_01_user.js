
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('first_name').notNull();
    table.string('last_name').notNull();
    table.string('username').notNull().unique();
    table.string('email').notNull().unique();
    table.string('password').notNull();
    table.string('avatar').notNull().defaultTo('https://cdn3.iconfinder.com/data/icons/black-easy/256/535108-user_256x256.png');
    table.integer('bets_won').notNull().defaultTo(0);
    table.integer('bets_lost').notNull().defaultTo(0);
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
