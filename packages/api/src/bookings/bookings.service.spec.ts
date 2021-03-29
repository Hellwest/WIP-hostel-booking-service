import { ForbiddenException, NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"

import { Room } from "../rooms/room.entity"
import { BookingRepository } from "../repositories/booking.repository"
import { RoomRepository } from "../repositories/room.repository"

import { Booking } from "./booking.entity"
import { BookingsService } from "./bookings.service"
import { BookRoomInput } from "./types/book-room.input"

const mockBookingRepository = (): unknown => ({
  findExistingBookingAsync: jest.fn(),
  bookRoomAsync: jest.fn(),
})

const mockRoomRepository = (): unknown => ({
  findOne: jest.fn(),
})

describe("BookingsService", () => {
  let bookingsService: BookingsService
  let bookingRepository
  let roomRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: BookingRepository, useFactory: mockBookingRepository },
        { provide: RoomRepository, useFactory: mockRoomRepository },
      ],
    }).compile()

    bookingsService = module.get<BookingsService>(BookingsService)
    bookingRepository = module.get<BookingRepository>(BookingRepository)
    roomRepository = module.get<RoomRepository>(RoomRepository)
  })

  describe("bookRoomAsync method", (): void => {
    const input = new BookRoomInput()

    it("should throw a ForbiddenException when room is occupied", async (): Promise<void> => {
      bookingRepository.findExistingBookingAsync.mockResolvedValue(
        new Booking(),
      )

      await expect(bookingsService.bookRoomAsync(input)).rejects.toThrow(
        ForbiddenException,
      )
    })

    it("should throw NotFoundException when room is not found", async (): Promise<void> => {
      roomRepository.findOne.mockResolvedValue()

      await expect(bookingsService.bookRoomAsync(input)).rejects.toThrow(
        NotFoundException,
      )
    })

    it("should successfully book a room and return a booking object", async (): Promise<void> => {
      const booking = new Booking()

      bookingRepository.findExistingBookingAsync.mockResolvedValue()
      roomRepository.findOne.mockResolvedValue(new Room())
      bookingRepository.bookRoomAsync.mockResolvedValue(booking)

      await expect(bookingsService.bookRoomAsync(input)).resolves.toEqual(
        booking,
      )
    })
  })
})
