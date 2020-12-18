import Vue from "vue";
import Vuex from "vuex";
import { ObjectId } from "bson";
import * as services from "@/services/";
import { Message, Room, UserData } from "@/@types";

Vue.use(Vuex);

export interface State {
  currentRoom?: Room;
  rooms: Array<Room>;
  users: Array<UserData>;
  messages: Array<Message>;
}

export const store = new Vuex.Store<State>({
  state: {
    currentRoom: undefined,
    rooms: [],
    users: [],
    messages: [],
  },
  getters: {},
  mutations: {
    setCurrentRoom: (state, payload: Room) => {
      state.currentRoom = payload;
    },
    updateRoom: (state, payload: Room) => {
      const roomIndex = state.rooms.findIndex(room => room._id.equals(payload._id));
      if (roomIndex != -1) {
        Vue.set(state.rooms, roomIndex, payload);
        if (state.currentRoom?._id.equals(payload._id)) state.currentRoom = payload;
      }
      else state.rooms.push(payload);
    },
    fetchRooms: (state, payload: Array<Room>) => {
      state.rooms = payload;
    },
    fetchUsers: (state, payload: Array<UserData>) => {
      state.users = payload;
    },
    fetchMessages: (state, payload) => {
      state.messages = payload;
    },
    fetchRoomMessages: (state, payload: { roomId: ObjectId | string, messages: Array<Message> }) => {
      const room = state.rooms.find(room => room._id.equals(new ObjectId(payload.roomId)));
      if (room) room.messages = payload.messages;
    },
    pushMessage: (state, payload: Message) => {
      const roomIndex = state.rooms.findIndex(room => room._id.equals(payload.room));
      if (roomIndex != -1 && state.rooms[roomIndex].messages) {
        state.rooms[roomIndex].messages!.push(payload);
        Vue.set(state.rooms, roomIndex, state.rooms[roomIndex]);
      }
    },
  },
  actions: {
    setCurrentRoom: async (context, payload: ObjectId | string) => {
      const room = context.state.rooms.find(room => room._id.equals(new ObjectId(payload)));
      if (!room?.messages) await context.dispatch("fetchRoomMessages", payload);
      context.commit("setCurrentRoom", room);
    },
    fetchRooms: async context => {
      try {
        const rooms: Array<Room> | undefined = await services.Rooms.findRooms();
        context.commit("fetchRooms", rooms);
        services.Rooms.watchRooms(change => {
          store.commit("updateRoom", change.fullDocument as Room);
        });
      } catch (e) {
        console.log("fetchRooms exception: ", e);
      }
    },
    fetchUsers: async context => {
      try {
        const users = await services.Users.findUsers();
        context.commit("fetchUsers", users);
      } catch (e) {
        console.log("fetchUsers exception: ", e);
      }
    },
    fetchRoomMessages: async (context, payload: ObjectId | string) => {
      try {
        const messages = await services.Messages.findMessages({room: new ObjectId(payload)});
        context.commit("fetchRoomMessages", { roomId: payload, messages: messages })
      } catch (e) {
        console.log("fetchRoomMessages exception: ", e);
      }
    },
    pushMessage: (context, payload) => {
      context.commit("pushMessage", payload);
    },
  },
});
