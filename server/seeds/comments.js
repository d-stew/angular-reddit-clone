
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({post_id: 1, user_id: 1, comment: "Super cool!"}),
    knex('comments').insert({post_id: 1, user_id: 2, comment: "No. This sucks."}),
    knex('comments').insert({post_id: 2, user_id: 1, comment: "Oh my goddddddd"})
  );
};
