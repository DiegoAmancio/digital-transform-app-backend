module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/modules/**/infra/database/*.entity.js'],
  migrations: ['./dist/shared/migrations/*.migration.js'],
  cli: {
    migrationsDir: './src/shared/migrations',
  },
  synchronize: process.env.DB_SYNC == 'true',
  ...(process.env.ISLOCALHOST === 'false' && {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
};
