import * as Realm from "realm-web";
import * as Auth from "./auth";
import * as Users from "./users";
import * as Rooms from "./rooms";
import * as Messages from "./messages";

const app = new Realm.App({
  id: "chatrooms-pezkx",
  baseUrl: "https://realm.mongodb.com",
});

export { app };
export { Auth };
export { Users };
export { Rooms };
export { Messages };
