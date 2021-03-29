import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { BookingRepository } from "../repositories/booking.repository"
import { RoomRepository } from "../repositories/room.repository"

import { Booking } from "./booking.entity"
import { BookRoomInput } from "./types/book-room.input"

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingRepository)
    private readonly bookingRepository: BookingRepository,
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
  ) {}

  async bookRoomAsync(input: BookRoomInput): Promise<Booking> {
    const existingBooking = await this.bookingRepository.findExistingBookingAsync(
      input,
    )

    if (existingBooking) {
      throw new ForbiddenException("api.roomIsOccupied")
    }

    const room = await this.roomRepository.findOne({
      where: { number: input.roomNumber },
    })

    if (!room) {
      throw new NotFoundException("api.roomNotFound")
    }

    return await this.bookingRepository.bookRoomAsync(input, room)
  }
}
