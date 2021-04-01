/* eslint-disable unicorn/no-null */
import { Test, TestingModule } from "@nestjs/testing"

import { Booking } from "../bookings/booking.entity"
import { Room } from "../rooms/room.entity"
import { CreateRoomInput } from "../rooms/types/create-room.input"
import { BookRoomInput } from "../bookings/types/book-room.input"

import { BookingRepository } from "./booking.repository"

describe("BookingRepository", () => {
  let bookingRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingRepository],
    }).compile()

    bookingRepository = module.get<BookingRepository>(BookingRepository)
  })

  describe("findExistingBookingAsync method", () => {
    let input: BookRoomInput

    beforeEach(() => {
      input = new BookRoomInput()
      bookingRepository.createQueryBuilder = jest.fn()
    })

    it("should check if room is booked for the specific date and return null", async () => {
      bookingRepository.createQueryBuilder = jest.fn(() => ({
        setParameters: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      }))

      await expect(
        bookingRepository.findExistingBookingAsync(input),
      ).resolves.toBeNull()
    })

    it("should check if room is booked for the specific date and return a booking", async () => {
      bookingRepository.createQueryBuilder = jest.fn(() => ({
        setParameters: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(new Booking()),
      }))

      await expect(
        bookingRepository.findExistingBookingAsync(input),
      ).resolves.toBeInstanceOf(Booking)
    })
  })

  describe("bookRoomAsync method", () => {
    const input = new CreateRoomInput()
    const room = new Room()

    it("should create and return a booking", async () => {
      const booking = new Booking()
      booking.save = jest.fn().mockReturnThis()

      bookingRepository.create = jest.fn().mockReturnValue(booking)

      await expect(
        bookingRepository.bookRoomAsync(input, room),
      ).resolves.toEqual(booking)
    })
  })
})
