import { Field, InputType, Int } from "@nestjs/graphql"

@InputType({ description: "Input for creating a room" })
export class CreateRoomInput {
  @Field((): typeof Int => Int, { description: "Number of a room to create" })
  number: number
}
