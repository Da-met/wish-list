import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import cls from './WishesPage.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getWishes, wishesPageActions, wishesPageReducer } from '../../model/slice/wishesPageSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWishesList } from '../../model/services/fetchWishesList/fetchWishesList';
import { useSelector } from 'react-redux';
import { getWishesPageError, getWishesPageInited, getWishesPageIsLoading } from '../../model/selectors/wishesPageSelectors';
import { Page } from 'widgets/Page/Page';
import { fetchNextWishesPage } from '../../model/services/fetchNextWishesPage/fetchNextWishesPage';
import { initWishesPage } from '../../model/services/initWishesPage/initWishesPage';
import { WishesPageFilters } from '../WishesPageFilters/WishesPageFilters';
import { WishList } from 'entities/Wish';
import { useSearchParams } from 'react-router-dom';

interface WishesPageProps {
    className?: string;
}


const reducers: ReducersList = {
	wishesPage: wishesPageReducer,
}


const WishesPage = (props: WishesPageProps) => {
    const { className } = props;
	const dispatch = useAppDispatch();
	const wishes = useSelector(getWishes.selectAll);
	const isLoading = useSelector(getWishesPageIsLoading);
	const error = useSelector(getWishesPageError);
	const inited = useSelector(getWishesPageInited);

	const [searchParams] = useSearchParams();

	const onLoadNextPart = useCallback(() => {
        if (!isLoading) {
			dispatch(fetchNextWishesPage());
		}
    }, [dispatch, isLoading]);
	
	useInitialEffect(() => {
		dispatch(initWishesPage(searchParams))
	})

    return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Page 
				onScrollEnd={onLoadNextPart} 
				className={classNames(cls.WishesPage, {}, [className])}
			>
				<WishesPageFilters className={cls.WishesPageFilters}/>
				<WishList 
					isLoading={isLoading}
					wishes={wishes} 
				/>
			</Page>	
		</DynamicModuleLoader>
        
    );
};

export default memo(WishesPage);


