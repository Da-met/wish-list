import cls from './FriendsPage.module.scss';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { Text } from '@/shared/ui/Text/Text';
import { FriendsList } from '@/entities/Friends';
import { useCallback, useEffect } from 'react';
import { PageHeading } from '@/shared/ui/PageHeading/PageHeading';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { friendsPageReducer, getFriends } from '../model/slice/friendsPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchFriendsList } from '../model/services/fetchFriendsList/fetchFriendsList';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { getFriendsPageIsLoading } from '../model/selectors/friendsPageSelectors';
import { SeoHead } from '@/shared/ui/SeoHead/SeoHead';
import { APP_NAME } from '@/shared/config/appName/appName';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';


interface FriendsPageProps {
    className?: string;
}

// const reducers: ReducersList = {
//     friendsPage: friendsPageReducer,
// }

const FriendsPage = ({className}: FriendsPageProps) => {
    const dispatch = useAppDispatch();
    const user = useSelector(getUserAuthData)

    useEffect(() => {
        dispatch(fetchFriendsList({ idUser: Number(user?.id) }))
    }, [dispatch, user?.id])

    const isLoading = useSelector(getFriendsPageIsLoading);
    const friendsList = useSelector(getFriends.selectAll);

    return (
        // <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <>
            <SeoHead
                title={`Мои друзья — ${APP_NAME}`}
                description={`
                    Список ваших друзей в ${APP_NAME}. 
                    Смотрите, кто с вами в друзьях, и заходите в их списки желаний.
                `}
                url="https://giftflow.ru/"
                image="https://giftflow.ru/images/preview-main.jpg"
            />
            <Page >
                <div className={cls.FriendsPage}>

                    <Text title={'Друзья'} className={cls.title} titleTag="h1"/>
                    {isLoading 
                        ? 
                            <div className={cls.wrapperSkeleton}>
                                <Skeleton className={cls.skeletonLi}/>
                            </div> 
                        :                     
                            <FriendsList 
                                isLoading={isLoading}
                                friendsList={friendsList}
                                userId={user?.id}
                            />
                    }


                </div>
                
            </Page>
        </>    
        // </DynamicModuleLoader>
    )
}

export default FriendsPage;