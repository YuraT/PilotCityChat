import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { RootState } from "./state";

import * as chat from "./modules/chat";

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  modules: {
    chat: chat.default,
  },
};

const store = new Vuex.Store<RootState>(storeOptions);

export default store;

export const {
  useState: useChatState,
  useGetters: useChatGetters,
  useActions: useChatActions,
  useMutations: useChatMutations,
} = createNamespacedHelpers<
  typeof chat.state,
  typeof chat.getters,
  typeof chat.actions,
  typeof chat.mutations
>(store, "chat");
