// model/services/deleteWish.ts
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';


// export const deleteWish = createAsyncThunk(
//   'wish/deleteWish',
//   async (id: number, thunkAPI) => {
//     try {
//       const response = await $api.delete(`/wish/${id}`);
//       return id; // возвращаем id, чтобы можно было удалить из стора
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Ошибка при удалении подарка');
//     }
//   }
// );


// export const deleteWish = createAsyncThunk<
//   void,                 
//   string,               
//   {
    
//     rejectValue: string 
//   }
// >(
//   'wish/deleteWish',
//   async (id, thunkAPI) => {
//     try {
//       // запрос на удаление
//     //   await $api.delete(`/wish/${id}`);
//       await extra.api.delete(`/wish/${id}`)
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue(e.message || 'Ошибка удаления');
//     }
//   }
// );


export const deleteWish = createAsyncThunk<void, string, ThunkConfig<string>>(
    'wishDetails/deleteWish',
    async (id, thunkApi) => {
      const { extra, rejectWithValue } = thunkApi;
  
      try {
        await extra.api.delete(`/wish/${id}`);
        // если сервер ничего не возвращает (204 No Content) — просто возвращаем void
      } catch (error) {
        console.log(error);
        return rejectWithValue('Ошибка удаления желания');
      }
    }
  );