import { Module } from "@nestjs/common"
import { RepositoriesModule } from "src/repositories/repositories.module"

import { BookingsResolver } from "./bookings.resolver"
import { BookingsService } from "./bookings.service"

@Module({
  imports: [RepositoriesModule],
  providers: [BookingsResolver, BookingsService],
})
export class BookingsModule {}
