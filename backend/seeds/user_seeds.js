
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
      // Inserts seed entries
  await knex('users').insert([
    {username: 'jobu', password: '1'},
    {username: 'nbuck', password: '1'},
    {username: 'alex', password: '1'}
  ]);
};