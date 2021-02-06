import * as Realm from "realm-web";
import { UserStruct } from "./user";

type MongoDocument = globalThis.Realm.Services.MongoDB.Document;
type MongoCollection = globalThis.Realm.Services.MongoDB.MongoDBCollection<MongoDocument>;

export interface Meta {
  getUser: () => Realm.User | null;
  userInterface: UserStruct;
  collectionUser: () => MongoCollection | null;
  collectionRoom: () => MongoCollection | null;
}

export { UserStruct };
