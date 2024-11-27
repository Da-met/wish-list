import axios from 'axios';
import { loginByUsername } from './loginByUsername';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { userActions } from 'entities/User';


jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);


describe('loginByUsername.test', () => {
    // test('success login', async () => {
    //     const userValue = {
    //         username: '123', 
    //         id: 1, 
    //         email: '123@yandex.ru', 
    //     };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({data: userValue}));
    //     const thunk = new TestAsyncThunk(loginByUsername);
    //     const result = await thunk.callThunk({username: '123', password: '123' , email: '123@yandex.ru' });

    //     expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    //     expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(userValue);
    // })

    // test('error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const thunk = new TestAsyncThunk(loginByUsername);
    //     const result = await thunk.callThunk({username: '123', password: '123' , email: '123@yandex.ru' });

    //     expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('error');
    // });
})