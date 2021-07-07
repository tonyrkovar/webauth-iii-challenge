const cleanup = require('knex-cleaner')

exports.seed = function (knex) {
  return cleanup.clean(knex, {
    mode: 'truncate',
    ignoreTables: [
      'knex_migrations',
      'knex_migration_lock'
    ]
  })
};
