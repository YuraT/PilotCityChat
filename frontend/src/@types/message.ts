import { ObjectId } from "bson";


export interface Message {
    _id: ObjectId
    user: string
    text: string
}