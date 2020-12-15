import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { Room } from "./room.entity"
import { RoomsService } from "./rooms.service"
import { CreateRoomInput } from "./types/create-room.input"

@Resolver()
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query((): [typeof Room] => [Room], {
    name: "getRooms",
    description: "Get all rooms",
    nullable: true,
  })
  async getRoomsAsync(): Promise<Room[]> {
    return await this.roomsService.getRoomsAsync()
  }

  @Mutation((): typeof Room => Room, {
    name: "createRoom",
    description: "Create a room",
    nullable: true,
  })
  async createRoomAsync(@Args("input") input: CreateRoomInput): Promise<Room> {
    return await this.roomsService.createRoomAsync(input)
  }
}
