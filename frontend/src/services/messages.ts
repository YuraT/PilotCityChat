import { ObjectId } from "bson";

import { Message } from "@/@types";
import * as services from "@/services";


export async function findMessages(filter: object): Promise<Array<Message> | undefined> {
  services.app.authenticator
  console.log("allUsers: ", services.app.allUsers);
  const mongo = services.app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("rooms");
  const findOptions = {
    projection: {
      messages: 1,
    }
  };
  try {
    const result = await mongoCollection?.findOne(filter, findOptions);
    console.log("findMessages: ", result);
    return result.messages as Array<Message>;
  } catch (e) {
    console.log("findMessages error:", e);
  }
}

export async function sendMessage(roomId: ObjectId | string, text: string) {
  const user = services.app.currentUser;
  try {
    const result = await user?.callFunction("sendMessage", { roomId, text });
    console.log("sendMessage: ", result);
  } catch (e) {
    console.log("sendMessage error: ", e);
  }
}
