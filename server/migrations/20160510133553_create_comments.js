exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('id');
    table.integer('post_id');
    table.string('username');
    table.string('comment');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
