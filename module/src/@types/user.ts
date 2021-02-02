import { ObjectId } from "bson";


// this will probably be obsolete
// export interface UserData {
//   userId: string;
//   email: string;
//   username: string;
//   firstname: string;
//   lastname: string;
// }

export interface UserStruct {
  id: string;
  username: string;
  profileImg: string;
}

export class ChatUser {
  _struct: UserStruct;
  _data: { [key: string]: string | ObjectId };
  constructor(userStruct: UserStruct, userData: { [x: string]: string | ObjectId }) {
    this._struct = userStruct;
    this._data = userData;
  }

  get id(): string {
    const id = this._data[this._struct.id]
    if (id instanceof ObjectId) {
      return id.toHexString();
    }
    return id;
  }
  get username(): string {
    const username = this._data[this._struct.username]
    if (!(username instanceof String)) {
      throw TypeError("username is not string");
    } else {
      return username as string;
    }
  }
  get profileImg(): string {
    const profileImg = this._data[this._struct.profileImg]
    if (!(profileImg instanceof String)) {
      throw TypeError("profileImg is not string");
    } else {
      return profileImg as string;
    }
  }
}
