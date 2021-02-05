import { ActionContext, ActionTree } from "vuex";

import state from "./state";
import getters from "./getters";
import { MutationTypes } from "./mutations";

interface ActionsCtx extends ActionContext<typeof state, never> {
  getters: {
    meta: ReturnType<typeof getters.meta>;
  };
}

interface Actions extends ActionTree<typeof state, never> {
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
