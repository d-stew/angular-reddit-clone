
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({username: "mikeferger", password: "magicmike"}),
    knex('users').insert({username: "daniel", password: "truck"}),
    knex('users').insert({username: "madeline", password: "tinder"})
  )
};
