import { registerEnumType } from "@nestjs/graphql"

export enum RoomStatusEnum {
  FREE = "FREE",
  OCCUPIED = "OCCUPIED",
}

registerEnumType(RoomStatusEnum, {
  name: "RoomStatusEnum",
  description: "Status of a room",
})
