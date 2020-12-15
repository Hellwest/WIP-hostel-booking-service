import { TypeOrmModuleOptions } from "@nestjs/typeorm"

import { databaseConfig } from "./db.config"
import { getBoolean } from "./get-boolean"

export const typeORMConfig: TypeOrmModuleOptions = {
  type: databaseConfig.type,
  host: process.env.DB_HOST || databaseConfig.host,
  port: Number(process.env.DB_PORT) || databaseConfig.port,
  username: process.env.DB_USERNAME || databaseConfig.username,
  password: process.env.DB_PASSWORD || databaseConfig.password,
  database: process.env.DB_NAME || databaseConfig.database,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: getBoolean(process.env.TYPEORM_SYNC, databaseConfig.synchronize),
  logging: databaseConfig.logging,
  migrationsRun: getBoolean(
    process.env.MIGRATIONS_RUN,
    databaseConfig.migrationsRun,
  ),
  cli: {
    migrationsDir: "src/migrations",
  },
}
