import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { BookingRepository } from "./booking.repository"
import { RoomRepository } from "./room.repository"

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository, BookingRepository])],
  exports: [TypeOrmModule],
})
export class RepositoriesModule {}
