
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bet', function(table) {
    table.increments();
    table.string('opponent');
    table.string('title').notNull();
    table.string('consequences');
    table.string('terms');
    table.date('bet_start_date');
    table.date('bet_end_date');
    table.date('accepted_date');
    table.date('proposed_date');
    table.string('state').notNull().defaultTo('Pending Acceptance');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bet');
};
