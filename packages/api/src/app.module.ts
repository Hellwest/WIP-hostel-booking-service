import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { typeORMConfig } from "./config"

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
