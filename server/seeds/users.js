
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({email: "fake@aol.com", username: "mikeferger", password: "magicmike"}),
    knex('users').insert({email: "test@hotmail.com", username: "daniel", password: "truck"}),
    knex('users').insert({email: "girl21@yahoo.com", username: "madeline", password: "tinder"})
  )
};
