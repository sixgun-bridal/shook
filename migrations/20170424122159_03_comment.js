
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments();
    table.string('content').notNull();
    table.integer('user_id');
    table.foreign('user_id').references('user.id');
    table.integer('bet_id');
    table.foreign('bet_id').references('bet.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
