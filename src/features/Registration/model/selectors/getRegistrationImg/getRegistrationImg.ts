import { StateSchema } from "@/app/providers/StoreProvider";

export const getRegistrationImg = (state: StateSchema) => state?.registration?.img || '';