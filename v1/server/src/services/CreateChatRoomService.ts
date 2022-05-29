import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";
import { v4 as uuidV4 } from "uuid";

@injectable()
class CreateChatRoomService {
    async execute(idUsers: string[]) {
        const room = ChatRoom.create({
            idUsers,
        })

        return room;
    }
}

export { CreateChatRoomService }