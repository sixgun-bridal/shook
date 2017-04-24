
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_bet', function(table) {
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('user.id');
    table.integer('bet_id');
    table.foreign('bet_id').references('bet.id');
    table.boolean('is_winner').notNull().defaultTo(false);
    table.boolean('is_proposer').notNull().defaultTo(false);
    table.boolean('is_acceptor').notNull().defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_bet');
};
