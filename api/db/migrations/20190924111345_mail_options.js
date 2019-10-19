
exports.up = async function(knex) {
    await knex.schema.createTable('mail_options', table => {
        table
          .increments('id')
          .unsigned()
          .notNullable()
          .primary();
        table.string('mail_content', 60).notNullable();
        table.string('subject', 60).notNullable();
        table.string('link', 60).notNullable();
        table
          .timestamp('created_at')
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp('updated_at')
          .notNullable()
          .defaultTo(knex.fn.now());
      });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('mail_options');
};
