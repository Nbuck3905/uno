
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games').del()
      // Inserts seed entries
  await knex('games').insert([
    {
      name: 'one', 
      users: [
        {
          id: 1,
          username: 'jobu',
          password: '1'
        },
        {
          id: 2,
          username: 'nbuch',
          password: '1'
        }
      ],
      size: 2,
      created_at: new Date  
    },
    {
      name: 'two', 
      users: [
        {
          id: 1,
          username: 'jobu',
          password: '1'
        },
        {
          id: 2,
          username: 'nbuch',
          password: '1'
        }
      ],
      size: 2,
      created_at: new Date 
    },
    {
      name: 'three', 
      users: [
        {
          id: 1,
          username: 'jobu',
          password: '1'
        },
        {
          id: 2,
          username: 'nbuch',
          password: '1'
        }
      ],
      size: 2,
      created_at: new Date 
    },
  ]);
};
