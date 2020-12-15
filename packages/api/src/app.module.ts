import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TerminusModule } from "@nestjs/terminus"
import { TypeOrmModule } from "@nestjs/typeorm"

import { typeORMConfig, graphQLConfig } from "./config"
import { HealthController } from "./health.controller"

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot(graphQLConfig),
  ],
  controllers: [HealthController],
  providers: [PlaceholderResolver],
})
export class AppModule {}
