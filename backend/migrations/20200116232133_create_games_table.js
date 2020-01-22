
exports.up = function(knex) {
    return knex.schema.createTable('games', (table) => {
        table.increments('id');
        table.string('name');
        table.integer('creator_id')
        table.string('users');
        table.integer('size');
        table.timestamp('created_at')
    })
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('games')
};