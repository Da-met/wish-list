import { $api } from '@/shared/api/api';
import { ListById } from './types';


export const getListById = async (id: number): Promise<ListById> => {
    const response = await $api.get<ListById>(`/lists/${id}`);
    return response.data;
};