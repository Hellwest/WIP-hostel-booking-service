import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import { EnhancedBaseEntity } from "../shared/entities/enhanced-base-entity"
import { Room } from "../rooms/room.entity"

@ObjectType({ description: "A booking object" })
@Entity()
export class Booking extends EnhancedBaseEntity {
  @Field((): typeof ID => ID, { description: "Booking ID" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field((): typeof Room => Room, { description: "Room that is booked" })
  @ManyToOne((): typeof Room => Room, (room: Room): Booking[] => room.bookings)
  room: Room

  @Field({ description: "Booking start date" })
  @Column({ type: "timestamptz" })
  startDate: Date

  @Field({ description: "Booking end date" })
  @Column({ type: "timestamptz" })
  endDate: Date

  @Field({ description: "Booking creation date" })
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date

  @Field({ description: "Booking update date" })
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date
}
