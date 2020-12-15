import { Module } from "@nestjs/common"
import { RepositoriesModule } from "src/repositories/repositories.module"

import { RoomsResolver } from "./rooms.resolver"
import { RoomsService } from "./rooms.service"

@Module({
  imports: [RepositoriesModule],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
