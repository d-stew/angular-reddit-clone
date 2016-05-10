exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.integer('post_id');
    table.string('author');
    table.string('comment');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
