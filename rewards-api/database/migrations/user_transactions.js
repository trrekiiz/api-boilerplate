exports.up = function (knex, Promise) {
  return knex.schema.createTable('UserTransactions', function (table) {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('mobileNumber', 20).notNullable();
    table.string('receiptNumber', 100);
    table.string('branchId', 20);
    table.string('status', 20).notNullable();
    table.string('referenceNumber', 20);
    table.string('imageLink', 20).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('UserTransactions')
};