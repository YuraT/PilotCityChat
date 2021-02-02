import * as Realm from "realm-web";
import { UserStruct } from "./user";

type MongoDocument = globalThis.Realm.Services.MongoDB.Document;
type MongoCollection = globalThis.Realm.Services.MongoDB.MongoDBCollection<MongoDocument>;


export interface Meta {
  currentUser: Realm.User;
  userInterface: UserStruct;
  collectionUser: MongoCollection;
  collectionRoom: MongoCollection;
}

export { UserStruct };