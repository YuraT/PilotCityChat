import { GetterTree } from "vuex";
import { ObjectId } from "bson";

import chatState from "./state";
import { ChatUser, Room, StoreMeta } from "../../../@types";

type GetterCtx<T> = (
  state: typeof chatState,
  getters: Getters
) => T;

export interface Getters extends GetterTree<typeof chatState, never> {
  meta: GetterCtx<StoreMeta.Meta | undefined>;
  currentRoom: GetterCtx<Room | undefined>;
  rooms: GetterCtx<Array<Room> | undefined>;
  users: GetterCtx<Array<ChatUser> | undefined>;
}

const getters: Getters = {
  meta(state) {
    return state.meta;
  },
  currentRoom(state, gets) {
    if (!state.currentRoom) return undefined;
    return gets
      .rooms(state, gets)
      ?.find((room: Room) => room._id.equals(state.currentRoom as ObjectId));
  },
  rooms(state) {
    return state.rooms;
  },
  users(state) {
    return state.users;
  },
};

export default getters;
