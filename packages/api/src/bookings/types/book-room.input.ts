import { Field, InputType, Int } from "@nestjs/graphql"

@InputType({ description: "Input for booking a room" })
export class BookRoomInput {
  @Field((): typeof Int => Int, { description: "Number of a room to book" })
  roomNumber: number

  @Field({ description: "Starting date" })
  startDate: Date

  @Field({ description: "Ending date" })
  endDate: Date
}
