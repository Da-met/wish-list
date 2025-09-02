

import { $api } from '@/shared/api/api'; // если у тебя axios-инстанс называется по-другому — поправь
import { AxiosResponse } from 'axios';

export const reserveWish = async (wishId: number): Promise<AxiosResponse> => {
  return $api.post('/reservation/reserve', { wishId });
};

export const unreserveWish = async (wishId: number): Promise<AxiosResponse> => {
  return $api.post('/reservation/unreserve', { wishId });
};