
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments();
    table.string('content').notNull();
    table.integer('users_id').references('id').inTable('users');
    table.integer('bet_id').references('id').inTable('bet');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
