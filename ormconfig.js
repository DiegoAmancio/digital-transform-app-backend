module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/modules/**/infra/database/*.entity.js'],
  migrations: ['./dist/shared/migrations/*.migration.js'],
  cli: {
    migrationsDir: './src/shared/migrations',
  },
  synchronize: process.env.DB_SYNC == 'true',
};
