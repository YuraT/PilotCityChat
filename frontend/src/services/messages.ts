import { ObjectId } from "bson";

import { Message } from "@/@types";
import * as services from "@/services";


export async function findMessages(filter: object): Promise<Array<Message> | undefined> {
  const mongo = services.app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("messages");
  try {
    const result = await mongoCollection?.find(filter);
    console.log("findMessages: ", result);
    return result as Array<Message>;
  } catch (e) {
    console.log("findMessages error:", e);
  }
}

export async function sendMessage(roomId: ObjectId | string, text: string) {
  const user = services.app.currentUser;
  try {
    const result = await user?.callFunction("sendMessage", {roomId, text});
    console.log("sendMessage: ", result);
  } catch (e) {
    console.log("sendMessage error: ", e);
  }
}

export async function watchMessages(callback: (change: object) => void) {
  const mongo = services.app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("messages");
  if (mongoCollection) {
    console.log("watching messages");
    for await (const change of mongoCollection?.watch()) {
      console.log("message change: ", change);
      callback(change);
    }
  }
}