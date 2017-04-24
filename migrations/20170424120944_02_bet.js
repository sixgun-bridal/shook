
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bet', function(table) {
    table.increments();
    table.string('type');
    table.string('consequences');
    table.date('bet_start_date');
    table.date('bet_end_date');
    table.date('accepted_date');
    table.date('proposed_date');
    table.integer('points').notNull().defaultTo(1);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bet');
};
