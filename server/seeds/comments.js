
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({post_id: 1, username: "mikeferger", comment: "Super cool!"}),
    knex('comments').insert({post_id: 1, username: "daniel", comment: "No. This sucks."}),
    knex('comments').insert({post_id: 2, username: "madeline", comment: "Oh my goddddddd"})
  );
};
