import { Module } from "vuex";
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const chat: Module<typeof state, never> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
export default chat;

export { state };
export { getters };
export { actions };
export { mutations };
