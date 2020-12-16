import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(socketio(socket));
client.configure(
  auth({
    storageKey: "auth"
  })
);

export { client };
export const authenticationService = client.service("authentication");
export const userService = client.service("users");
export const messageService = client.service("messages");
export const roomService = client.service("rooms");

import * as Realm from "realm-web";
import * as Auth from "./auth";
import * as Users from "./users";
import * as Rooms from "./rooms";
import * as Messages from "./messages"

const app = new Realm.App({
  id: "chatrooms-pezkx",
  baseUrl: "https://realm.mongodb.com"
});

export { app };
export { Auth };
export { Users };
export { Rooms };
export { Messages };
