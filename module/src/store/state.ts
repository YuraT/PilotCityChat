import chatState from "./modules/chat/state";

export interface RootState {
  chat: typeof chatState;
}
