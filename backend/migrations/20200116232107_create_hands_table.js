
exports.up = function(knex) {
    return knex.schema.createTable('hands', (table) => {
        table.increments('id');
        table.integer('game_id');
        table.integer('user_id');
        table.timestamp('created_at')
    })
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('hands')
};