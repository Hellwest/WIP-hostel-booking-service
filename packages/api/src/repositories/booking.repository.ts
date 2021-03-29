import { EntityRepository, Repository } from "typeorm"

import { Booking } from "../bookings/booking.entity"
import { BookRoomInput } from "../bookings/types/book-room.input"
import { Room } from "../rooms/room.entity"

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
  async findExistingBookingAsync(
    input: BookRoomInput,
  ): Promise<Booking | null> {
    const { roomNumber, startDate, endDate } = input

    return await this.createQueryBuilder("booking")
      .setParameters({ roomNumber, startDate, endDate })
      .leftJoin("booking.room", "room")
      .where(
        "room.number = :roomNumber AND booking.startDate >= :startDate AND booking.endDate <= :endDate",
      )
      .orWhere(
        "room.number = :roomNumber AND booking.endDate >= :startDate AND booking.endDate <= :endDate",
      )
      .orWhere(
        "room.number = :roomNumber AND booking.startDate <= :startDate AND booking.endDate >= :endDate",
      )
      .getOne()
  }

  async bookRoomAsync(input: BookRoomInput, room: Room): Promise<Booking> {
    const { startDate, endDate } = input

    const booking = this.create()
    booking.room = room
    booking.startDate = startDate
    booking.endDate = endDate

    return await booking.save()
  }
}
