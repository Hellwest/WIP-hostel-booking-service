import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"
import { EnhancedBaseEntity } from "src/shared/entities/enhanced-base-entity"
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import { RoomStatusEnum } from "./types/room-status.enum"

@ObjectType({ description: "Room object" })
@Entity()
export class Room extends EnhancedBaseEntity {
  @Field((): GraphQLScalarType => ID, { description: "Room ID" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field((): GraphQLScalarType => Int, { description: "Room number" })
  @Index({ unique: true })
  @Column()
  number: number

  @Field((): typeof RoomStatusEnum => RoomStatusEnum, {
    description: "Room status",
    defaultValue: RoomStatusEnum.FREE,
  })
  @Column({ default: RoomStatusEnum.FREE })
  status: RoomStatusEnum = RoomStatusEnum.FREE

  @Field({ description: "Room object creation date" })
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date

  @Field({ description: "Room object update date" })
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date
}
