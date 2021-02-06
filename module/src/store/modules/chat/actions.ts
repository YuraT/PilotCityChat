import { ActionContext, ActionTree } from "vuex";

import state from "./state";
import getters from "./getters";
import { MutationTypes } from "./mutations";
import { ObjectId } from "bson";
import { ChatUser, Room } from "@/@types";

interface ActionsCtx extends ActionContext<typeof state, never> {
  getters: {
    meta: ReturnType<typeof getters.meta>;
    currentRoom: ReturnType<typeof getters.currentRoom>;
    rooms: ReturnType<typeof getters.rooms>;
    users: ReturnType<typeof getters.users>;
  };
}

interface Actions extends ActionTree<typeof state, never> {
  setMeta: (ctx: ActionsCtx, payload: typeof state.meta) => void;
  clearData: (ctx: ActionsCtx) => void;
  setCurrentRoom: (ctx: ActionsCtx, payload: ObjectId | string) => void;
  fetchRooms: (ctx: ActionsCtx) => void;
  fetchUsers: (ctx: ActionsCtx) => void;
}

const actions: Actions = {
  setMeta({ commit }, meta) {
    commit(MutationTypes.SET_META, meta);
  },
  clearData({ commit }) {
    commit(MutationTypes.CLEAR_DATA);
  },
  setCurrentRoom({ commit }, roomId) {
    commit(MutationTypes.SET_CURRENT_ROOM, new ObjectId(roomId));
  },
  async fetchRooms({ getters, commit }) {
    const roomCollection = getters.meta?.collectionRoom();
    const findOptions: Realm.Services.MongoDB.FindOptions = {
      projection: {
        messages: 0,
      },
    };

    const rooms = (await roomCollection?.find({}, findOptions)) as Room[];
    if (!rooms) throw Error("chat/fetchRooms: rooms not found in collection");
    commit(MutationTypes.SET_ROOMS, rooms);
  },
  async fetchUsers({ getters, commit }) {
    const userCollection = getters.meta?.collectionUser();
    const userInterface = getters.meta?.userInterface;
    if (!userInterface)
      throw ReferenceError("chat/meta.userInterface not defined");

    const userProjection: { [property: string]: boolean } = {};
    userProjection[userInterface.id] = true;
    userProjection[userInterface.username] = true;
    userProjection[userInterface.profileImg] = true;

    const findOptions: Realm.Services.MongoDB.FindOptions = {
      projection: userProjection,
    };
    const users = await userCollection?.find({}, findOptions);
    if (!users) throw Error("chat/fetchUsers: users not found in collection");
    commit(
      MutationTypes.SET_USERS,
      users.map(
        user =>
          new ChatUser(
            userInterface,
            (user as unknown) as { [key: string]: string | ObjectId }
          )
      )
    );
  },
};

export default actions;
