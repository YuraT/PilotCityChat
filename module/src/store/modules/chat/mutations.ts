import { MutationTree } from "vuex";
import state from "./state";

export const enum MutationTypes {
  SET_META = "setMeta",
}

const mutations: MutationTree<typeof state> = {
  [MutationTypes.SET_META](state, meta) {
    state.meta = meta;
  },
};

export default mutations;
