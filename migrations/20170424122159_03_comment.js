
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments();
    table.string('content').notNull();
    table.integer('users_id').references('users.id');
    table.integer('bet_id').references('bet.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
