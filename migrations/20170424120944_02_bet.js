
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bet', function(table) {
    table.increments();
    table.string('title').notNull();
    table.string('consequences');
    table.string('terms');
    table.date('bet_start_date');
    table.date('bet_end_date');
    table.date('accepted_date');
    table.date('proposed_date');
    table.integer('bets_won').defaultTo(0);
    table.integer('bets_lost').defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bet');
};
