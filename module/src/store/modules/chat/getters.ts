import { GetterTree } from "vuex";

import { RootState } from "@/store/state";
import chatState from "./state";
import { Meta } from "@/@types/meta";

type GetterCtx<T> = (
  state: typeof chatState,
  getters: Getters,
  rootState: RootState
) => T;

export interface Getters extends GetterTree<typeof chatState, RootState> {
  meta: GetterCtx<Meta | undefined>;
}

const getters: Getters = {
  meta: state => {
    return state.meta;
  },
};

export default getters;
