
export type {
    Friend,
} from './model/types/friend';


export {
    FriendsPageAsync as FriendsPage
} from './ui/FriendsPage.async';

export type { FriendsPageSchema } from './model/types/friendsPageSchema'

export { friendsPageReducer } from './model/slice/friendsPageSlice'
export { friendsPageActions } from './model/slice/friendsPageSlice'