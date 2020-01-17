
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('hands').del()
      // Inserts seed entries
  await knex('hands').insert([
    {game_id: 1, user_id: 1, created_at:  new Date },
    {game_id: 1, user_id: 2, created_at:  new Date },
    {game_id: 2, user_id: 1, created_at:  new Date },
    {game_id: 2, user_id: 2, created_at:  new Date },
    {game_id: 3, user_id: 1, created_at:  new Date },
    {game_id: 3, user_id: 2, created_at:  new Date },
  ]);
};
