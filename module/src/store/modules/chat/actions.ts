import { ActionContext, ActionTree } from "vuex";

import { RootState } from "@/store/state";
import state from "./state";
import getters from "./getters";
import { MutationTypes } from "./mutations";

interface ActionsCtx extends ActionContext<typeof state, RootState> {
  getters: {
    meta: ReturnType<typeof getters.meta>;
  };
}

interface Actions extends ActionTree<typeof state, RootState> {
  setMeta: (
    ctx: ActionsCtx,
    payload: { meta: typeof state.meta }
  ) => void;
}

const actions: Actions = {
  setMeta({ commit }, { meta }) {
    commit(MutationTypes.SET_META, meta);
  },
};

export default actions;
