
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_bet', function(table) {
    table.increments();
    table.integer('users_id').references('id').inTable('users');
    table.integer('bet_id').references('id').inTable('bet');
    table.boolean('is_winner').notNull().defaultTo(false);
    table.boolean('is_proposer').notNull().defaultTo(false);
    table.boolean('is_acceptor').notNull().defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_bet');
};
