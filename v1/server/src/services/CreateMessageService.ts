import { injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { Message } from "../schemas/Message";

@injectable()
class CreateMessageService {
    async execute({ to, text, roomId }: { to: string, text: string, roomId: string }) {
        const message = await Message.create({
            to,
            text,
            roomId,
        })

        return message;
    }
}

export { CreateMessageService }