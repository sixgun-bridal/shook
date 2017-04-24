
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
    table.increments();
    table.string('first_name').notNull();
    table.string('last_name').notNull();
    table.string('username').notNull().unique();
    table.string('email').notNull().unique();
    table.string('password').notNull();
    table.integer('total_points').notNull().defaultTo(0);
    table.string('avatar').notNull().defaultTo('http://www.freeiconspng.com/uploads/grab-vector-graphic-person-icon--imagebasket-13.png');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
