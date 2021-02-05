import { GetterTree } from "vuex";

import chatState from "./state";
import { Meta } from "@/@types/meta";

type GetterCtx<T> = (
  state: typeof chatState,
  getters: Getters
) => T;

export interface Getters extends GetterTree<typeof chatState, never> {
  meta: GetterCtx<Meta | undefined>;
}

const getters: Getters = {
  meta: state => {
    return state.meta;
  },
};

export default getters;
