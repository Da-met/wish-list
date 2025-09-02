import { EntityState } from '@reduxjs/toolkit';
import { Wish } from '@/entities/Wish';
import { WishesSortField } from '@/entities/Wish';
import { ScopeFilter, SortOrder, StatusFilter } from '@/shared/types';


export interface WishPageSchema extends EntityState<Wish> {
    isLoading?: boolean;
    error?: string;

    // PAGINATION
    page: number;
    limit: number;
    hasMore: boolean;

    order: SortOrder;
    sort: WishesSortField;
    search: string;
    _inited: boolean;

    // НОВОЕ
    scope: ScopeFilter;   // все / друзья
    status: StatusFilter; // активные / все
    // filter: SortFilter; 
}

// export interface WishPageSchema {
//     isLoading?: boolean;
//     error?: string;
//     data?: Wish[];
// }
