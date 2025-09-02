import { StateSchema } from "@/app/providers/StoreProvider";

export const getRegistrationBirthday = (state: StateSchema) => state?.registration?.birthday || '';