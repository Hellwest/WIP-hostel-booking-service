import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TerminusModule } from "@nestjs/terminus"
import { TypeOrmModule } from "@nestjs/typeorm"

import { typeORMConfig, graphQLConfig } from "./config"
import { HealthController } from "./health.controller"
import { SharedModule } from "./shared/shared.module"
import { RoomsModule } from "./rooms/rooms.module"
import { BookingsModule } from "./bookings/bookings.module"

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot(graphQLConfig),
    SharedModule,
    RoomsModule,
    BookingsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
