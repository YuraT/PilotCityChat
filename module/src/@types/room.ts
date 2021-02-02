import { ObjectId } from "bson";
import { Message } from "./message";

export interface Room {
  _id: ObjectId;
  owner: string;
  members: Array<string>;
  name: string;
  messages?: Array<Message>;
}
