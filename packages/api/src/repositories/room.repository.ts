import { EntityRepository, Repository } from "typeorm"

import { Room } from "../rooms/room.entity"

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {}
