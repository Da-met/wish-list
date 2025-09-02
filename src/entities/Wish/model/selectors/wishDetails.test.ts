import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getWishDetailsData,
    getWishDetailsError,
    getWishDetailsIsLoading,
} from './wishDetails';

describe('articleDetails.test', () => {
    test('should return data', () => {
        const data = {
            id: 1,
            title: 'subtitle',
        };
        const state: DeepPartial<StateSchema> = {
            wishDetails: {
                data,
            },
        };
        expect(getWishDetailsData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state data', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getWishDetailsData(state as StateSchema)).toEqual(undefined);
    });
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            wishDetails: {
                error: 'error',
            },
        };
        expect(getWishDetailsError(state as StateSchema)).toEqual('error');
    });
    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getWishDetailsError(state as StateSchema)).toEqual(undefined);
    });
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            wishDetails: {
                isLoading: true,
            },
        };
        expect(getWishDetailsIsLoading(state as StateSchema)).toEqual(true);
    });
    // test('should work with empty state isLoading', () => {
    //     const state: DeepPartial<StateSchema> = {};
    //     expect(getWishDetailsIsLoading(state as StateSchema)).toEqual(false);
    // });
});
