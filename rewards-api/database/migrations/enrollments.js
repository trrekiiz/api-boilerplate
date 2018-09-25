exports.up = function (knex, Promise) {
  return knex.schema.createTable('Enrollments', function (table) {
    table.increments('id');
    table.string('transactionId', 255).notNullable();
    table.string('redeemId', 255).notNullable();
    table.string('adminId', 20).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('Enrollments')
};