import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Input for creating a room" })
export class CreateRoomInput {
  @Field()
  number: number
}
