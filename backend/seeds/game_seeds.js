
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games').del()
      // Inserts seed entries
  await knex('games').insert([
    {
      name: 'one', 
      creator_id: 1,
      users: JSON.stringify([2, 3]),
      size: 3,
      created_at: new Date  
    },
    {
      name: 'two',
      creator_id: 1, 
      users: JSON.stringify([2]),
      size: 3,
      created_at: new Date 
    },
    {
      name: 'three',
      creator_id: 1,
      users: JSON.stringify([2]),
      size: 2,
      created_at: new Date 
    },
  ]);
};
