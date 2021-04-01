import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { RoomRepository } from "src/repositories/room.repository"

import { Room } from "./room.entity"
import { CreateRoomInput } from "./types/create-room.input"

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
  ) {}

  async getRoomsAsync(): Promise<Room[]> {
    return await this.roomRepository.find()
  }

  async createRoomAsync(input: CreateRoomInput): Promise<Room> {
    const { number } = input

    const existingRoom = await this.roomRepository.findOne({ number })

    if (existingRoom) {
      throw new ConflictException("api.roomExists")
    }

    return await this.roomRepository.create({ number }).save()
  }
}
