// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'jeopardy_api'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'jeopardy_api_test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
