import { Test, TestingModule } from "@nestjs/testing"

import { Booking } from "./booking.entity"
import { BookingsResolver } from "./bookings.resolver"
import { BookingsService } from "./bookings.service"
import { BookRoomInput } from "./types/book-room.input"

const mockBookingsService = (): unknown => ({
  bookRoomAsync: jest.fn(),
})

describe("BookingsResolver", () => {
  let bookingsResolver: BookingsResolver
  let bookingsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsResolver,
        { provide: BookingsService, useFactory: mockBookingsService },
      ],
    }).compile()

    bookingsResolver = module.get<BookingsResolver>(BookingsResolver)
    bookingsService = module.get<BookingsService>(BookingsService)
  })

  describe("bookRoom mutation", () => {
    const input = new BookRoomInput()

    it("should call service's bookRoomAsync method and return a booking record", async () => {
      const booking = new Booking()

      bookingsService.bookRoomAsync.mockResolvedValue(booking)
      expect(bookingsService.bookRoomAsync).not.toHaveBeenCalled()

      const result = await bookingsResolver.bookRoomAsync(input)

      expect(bookingsService.bookRoomAsync).toHaveBeenCalled()
      expect(result).toEqual(booking)
    })
  })
})
