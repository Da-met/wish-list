// model/types/reservedWishesSchema.ts
import { EntityState } from '@reduxjs/toolkit';
import { Wish } from '@/entities/Wish';

export interface ReservedWishesSchema extends EntityState<Wish> {
  isLoading: boolean;
  error?: string;
}
