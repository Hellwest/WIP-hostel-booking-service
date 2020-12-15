import { Module } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"
import { TypeOrmModule } from "@nestjs/typeorm"

import { typeORMConfig } from "./config"
import { HealthController } from "./health/health.controller"

@Module({
  imports: [TerminusModule, TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
