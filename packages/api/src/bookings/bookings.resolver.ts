import { Args, Mutation, Resolver } from "@nestjs/graphql"

import { Booking } from "./booking.entity"
import { BookingsService } from "./bookings.service"
import { BookRoomInput } from "./types/book-room.input"

@Resolver()
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation((): typeof Booking => Booking, {
    name: "bookRoom",
    description: "Book a room",
    nullable: true,
  })
  async bookRoomAsync(@Args("input") input: BookRoomInput): Promise<Booking> {
    return await this.bookingsService.bookRoomAsync(input)
  }
}
