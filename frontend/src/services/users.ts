import { UserData } from "@/@types";
import { app } from "@/services";

export async function updateUserDocument(userData: UserData) {
  // see https://docs.mongodb.com/realm/web/mongodb/#instantiate-a-mongodb-collection-handle
  const mongo = app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("users");
  try {
    const result = await mongoCollection?.updateOne(
      { userId: app.currentUser?.id },
      { $set: userData }
    );
    console.log("updateUserDocument: ", result);
    return result;
  } catch (e) {
    console.log("updateUserDocument error: ", e);
  }
}

export async function findUsers(): Promise<Array<UserData> | undefined> {
  const mongo = app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("users");
  try {
    const result = await mongoCollection?.find();
    console.log("findUsers: ", result);
    return result as Array<UserData>;
  } catch (e) {
    console.log("findUsers error:", e);
  }
}
