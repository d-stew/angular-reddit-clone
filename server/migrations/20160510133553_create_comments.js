exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments();
    table.integer('post_id');
    table.string('user_id');
    table.string('comment');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
