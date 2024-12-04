
export { 
    getUserAuthData 
} from './model/selectors/getUserAuthData/getUserAuthData';

export { 
    userReducer, 
    userActions 
} from './model/slice/userSlice';

export { 
    UserSchema, 
    User,
} from './model/types/user';

// export {getUserReadonly} from '../Profile/model/selectors/getProfileReadonly/getProfileReadonly';
// export {getUserForm} from '../Profile/model/selectors/getProfileForm/getProfileForm';
// export {getUserError} from '../Profile/model/selectors/getProfileError/getProfileError';
// export {getUserIsLoading} from '../Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';