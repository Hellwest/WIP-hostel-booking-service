import { Room } from "src/rooms/room.entity"
import { EntityRepository, Repository } from "typeorm"

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {}
