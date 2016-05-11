exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    table.increments('id');
    table.timestamp('date').defaultTo(knex.fn.now());
    table.string('title').notNullable();
    table.string('author').notNullable();
    table.string('image');
    table.text('description');
    table.integer('score').defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
};
