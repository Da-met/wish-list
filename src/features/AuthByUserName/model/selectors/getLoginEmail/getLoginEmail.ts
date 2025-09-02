import { StateSchema } from "@/app/providers/StoreProvider";

export const getLoginEmile = (state: StateSchema) => state?.loginForm?.email || '';