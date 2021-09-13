let options

switch (process.env.DATABASE_TYPE) {
  case 'sqlite':
    options = {
      type: 'sqlite',
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      database: process.env.DATABASE_DATABASE,
      migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
      entities: ['**/*.entity.ts'],
      migrations: ['src/migrations/*.ts'],
    }
    break
  case 'mysql':
    options = {
      type: 'mysql',
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      keepConnectionAlive: true,
      url: process.env.DATABASE_URL,
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: ['**/*.entity.ts'],
      migrations: ['src/migrations/*.ts'],
    }
    break
  case 'postgres':
    options = {
      type: 'postgres',
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      url: process.env.DATABASE_URL,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
      ssl: process.env.DATABASE_SSL === 'true',
      entities: ['**/*.entity.ts'],
      migrations: ['src/migrations/*.ts'],
    }
    break
  default:
    throw new Error(
      'There is not another database type supported! Only "mysql", "postgres" and "sqlite" can be used',
    )
}

export default options
