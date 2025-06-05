import { neonrank } from "../instance";
import type { TierList } from "../types/tierList";

export const getAllTierLists = async () => {
    neonrank.get<TierList[]>("/tierlists");
};
