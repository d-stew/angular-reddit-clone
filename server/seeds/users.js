
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, username: "mikeferger", password: "magicmike"}),
    knex('users').insert({id: 2, username: "daniel", password: "truck"}),
    knex('users').insert({id: 3, username: "madeline", password: "tinder"})
  )
};
