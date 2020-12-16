import { Room } from "@/@types";
import { app } from "@/services";

export async function createRoom(roomName: String) {
  // does not work yet, will probably do this with a cloud function
  const mongo = app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("rooms");
  try {
    const result = await mongoCollection?.insertOne({
      owner: app.currentUser?.id,
      members: [app.currentUser?.id],
      name: roomName,
      messages: []
    });
    console.log("createRoom: ", result);
    return result;
  } catch (e) {
    console.log("createRoom error: ", e);
  }
}

export async function findRooms(): Promise<Array<Room> | undefined> {
  const mongo = app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("rooms");
  let findOptions = {
    projection: {
      messages: 0
    }
  };
  try {
    const result = await mongoCollection?.find({}, findOptions);
    console.log("findRooms: ", result);
    return result as Array<Room>;
  } catch (e) {
    console.log("findRooms error:", e);
  }
}

export async function watchRooms(callback: (change: any) => void) {
  const mongo = app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("rooms");
  if (mongoCollection) {
    for await (const change of mongoCollection?.watch()) {
      console.log("room change: ", change);
      callback(change);
    }
  }
}
