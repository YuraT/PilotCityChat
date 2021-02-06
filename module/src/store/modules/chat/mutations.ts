import { MutationTree } from "vuex";
import { ObjectId } from "bson";
import state from "./state";
import { ChatUser, Room, StoreMeta } from "../../../@types";

export const enum MutationTypes {
  SET_META = "setMeta",
  CLEAR_DATA = "clearData",
  SET_CURRENT_ROOM = "setCurrentRoom",
  SET_ROOMS = "setRooms",
  SET_USERS = "setUsers",
}

const mutations: MutationTree<typeof state> = {
  [MutationTypes.SET_META](state, payload: StoreMeta.Meta) {
    state.meta = payload;
  },
  [MutationTypes.CLEAR_DATA](state) {
    state.currentRoom = undefined;
    state.rooms = undefined;
    state.users = undefined;
  },
  [MutationTypes.SET_CURRENT_ROOM](state, payload: ObjectId) {
    state.currentRoom = payload;
  },
  [MutationTypes.SET_ROOMS](state, payload: Array<Room>) {
    state.rooms = payload;
  },
  [MutationTypes.SET_USERS](state, payload: Array<ChatUser>) {
    state.users = payload;
  },
};

export default mutations;
