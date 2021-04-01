import { Test, TestingModule } from "@nestjs/testing"

import { Room } from "./room.entity"
import { RoomsResolver } from "./rooms.resolver"
import { RoomsService } from "./rooms.service"
import { CreateRoomInput } from "./types/create-room.input"

const mockRoomsService = (): unknown => ({
  getRoomsAsync: jest.fn(),
  createRoomAsync: jest.fn(),
})

describe("RoomsResolver", () => {
  let roomsResolver: RoomsResolver
  let roomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsResolver,
        { provide: RoomsService, useFactory: mockRoomsService },
      ],
    }).compile()

    roomsResolver = module.get<RoomsResolver>(RoomsResolver)
    roomsService = module.get<RoomsService>(RoomsService)
  })

  describe("getRooms query", () => {
    it("should call service's getRoomsAsync and return an array of rooms", async () => {
      const rooms = [new Room()]

      roomsService.getRoomsAsync.mockResolvedValue(rooms)
      expect(roomsService.getRoomsAsync).not.toHaveBeenCalled()

      const result = await roomsResolver.getRoomsAsync()

      expect(roomsService.getRoomsAsync).toHaveBeenCalled()
      expect(result).toEqual(rooms)
    })
  })

  describe("createRoom mutation", () => {
    const input = new CreateRoomInput()

    it("should call service's createRoomAsync and return a room", async () => {
      const room = new Room()

      roomsService.createRoomAsync.mockResolvedValue(room)
      expect(roomsService.createRoomAsync).not.toHaveBeenCalled()

      const result = await roomsResolver.createRoomAsync(input)

      expect(roomsService.createRoomAsync).toHaveBeenCalled()
      expect(result).toEqual(room)
    })
  })
})
