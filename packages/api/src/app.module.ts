import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TerminusModule } from "@nestjs/terminus"
import { TypeOrmModule } from "@nestjs/typeorm"

import { typeORMConfig, graphQLConfig } from "./config"
import { HealthController } from "./health.controller"
import { SharedModule } from "./shared/shared.module"

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot(graphQLConfig),
    SharedModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
