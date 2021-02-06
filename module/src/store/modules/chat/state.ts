import { ChatUser, Room, StoreMeta } from "../../../@types";
import { ObjectId } from "bson";

const state: {
  meta?: StoreMeta.Meta;
  currentRoom?: ObjectId;
  rooms?: Array<Room>;
  users?: Array<ChatUser>;
} = {
  meta: undefined,
  currentRoom: undefined,
  rooms: undefined,
  users: undefined,
};

export default state;
