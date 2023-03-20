module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "contact_app",
    host: "127.0.0.1",
    dialect: "postgres",
    port: "5432",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    port: "5432",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    port: "5432",
  },
};
