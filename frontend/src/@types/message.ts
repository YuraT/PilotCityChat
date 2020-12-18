import { ObjectId } from "bson";


export interface Message {
    _id: ObjectId
    room: ObjectId
    user: string
    text: string
}