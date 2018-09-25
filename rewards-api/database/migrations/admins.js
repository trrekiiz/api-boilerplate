exports.up = function (knex, Promise) {
  return knex.schema.createTable('Admins', function (table) {
    table.increments('id');
    table.string('username', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('aliasName', 20).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('Admins')
};