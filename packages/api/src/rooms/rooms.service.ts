import { Injectable } from "@nestjs/common"
import { RoomRepository } from "src/repositories/room.repository"

import { Room } from "./room.entity"
import { CreateRoomInput } from "./types/create-room.input"

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async getRoomsAsync(): Promise<Room[]> {
    return await this.roomRepository.find()
  }

  async createRoomAsync(input: CreateRoomInput): Promise<Room> {
    return await this.roomRepository.create({ number: input.number }).save()
  }
}
