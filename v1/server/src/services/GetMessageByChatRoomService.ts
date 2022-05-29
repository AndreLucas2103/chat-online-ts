import { injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { Message } from "../schemas/Message";

@injectable()
class GetMessageByChatRoomService {
    async execute(idChatRoom: string) {
        const messages = await Message.find({
            roomId: idChatRoom,
        }).populate("to").exec();

        return messages;
    }
}

export { GetMessageByChatRoomService }