
import { EntityState } from '@reduxjs/toolkit';
import { Wish } from '@/entities/Wish';

export interface WishesByListSchema extends EntityState<Wish> {
  isLoading: boolean;
  error?: string;
}