
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({id: 1, post_id: 1, user_id: 1, comment: "Super cool!"}),
    knex('comments').insert({id: 2, post_id: 1, user_id: 2, comment: "No. This sucks."}),
    knex('comments').insert({id: 3, post_id: 2, user_id: 1, comment: "Oh my goddddddd"})
  );
};
