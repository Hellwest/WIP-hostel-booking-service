import { ConflictException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"

import { RoomRepository } from "../repositories/room.repository"

import { Room } from "./room.entity"
import { RoomsService } from "./rooms.service"
import { CreateRoomInput } from "./types/create-room.input"

const mockRoomRepository = (): unknown => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
})

describe("RoomsService", () => {
  let roomsService: RoomsService
  let roomRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: RoomRepository, useFactory: mockRoomRepository },
      ],
    }).compile()

    roomsService = module.get<RoomsService>(RoomsService)
    roomRepository = module.get<RoomRepository>(RoomRepository)
  })

  describe("getRoomsAsync method", (): void => {
    it("should call repository's find method and return an array", async (): Promise<void> => {
      const rooms = []

      roomRepository.find.mockResolvedValue(rooms)
      expect(roomRepository.find).not.toHaveBeenCalled()

      const result = await roomsService.getRoomsAsync()

      expect(roomRepository.find).toHaveBeenCalled()
      expect(result).toEqual(rooms)
    })
  })

  describe("createRoomAsync method", (): void => {
    const input = new CreateRoomInput()

    it("should throw a ConflictException when room is occupied", async (): Promise<void> => {
      roomRepository.findOne.mockResolvedValue(new Room())

      await expect(roomsService.createRoomAsync(input)).rejects.toThrow(
        ConflictException,
      )
    })

    it("should successfully book a room and return a room object", async (): Promise<void> => {
      const room = new Room()
      room.save = jest.fn().mockReturnThis()

      roomRepository.findOne.mockResolvedValue()
      roomRepository.create.mockReturnValue(room)

      await expect(roomsService.createRoomAsync(input)).resolves.toEqual(room)
    })
  })
})
