import * as Realm from "realm-web";

import { UserData } from "@/@types";
import { app } from "@/services";

import { updateUserDocument } from "./users";

export async function loginUserEmailPassword(email: string, password: string) {
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    console.log("loginUserEmailPassword: ", user);
    return user;
  } catch (e) {
    console.log("loginUserEmailPassword error: ", e);
  }
}

export async function registerUserEmailPassword(email: string, password: string, userData: UserData) {
  await app.emailPasswordAuth.registerUser(email, password);
  const credentials = Realm.Credentials.emailPassword(email, password);

  try {
    const user = await app.logIn(credentials);
    console.log("registerUserEmailPassword: ", user);
    await updateUserDocument(userData);
    return user;
  } catch (e) {
    console.log("registerUserEmailPassword error: ", e);
  }
}

export async function logOut() {
  try {
    await app.currentUser?.logOut();
    console.log("logOut");
  } catch (e) {
    console.log("logOut error: ", e);
  }
}
