import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import cls from './CompilationsPage.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getWishes, wishesPageReducer } from '../../model/slice/wishesPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getWishesPageError, getWishesPageInited, getWishesPageIsLoading } from '../../model/selectors/wishesPageSelectors';
import { Page } from '@/widgets/Page/Page';
import { fetchNextWishesPage } from '../../model/services/fetchNextWishesPage/fetchNextWishesPage';
import { initWishesPage } from '../../model/services/initWishesPage/initWishesPage';
import { WishesPageFilters } from '../WishesPageFilters/WishesPageFilters';
import { WishList } from '@/entities/Wish';
import { useSearchParams } from 'react-router-dom';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { CompilationsList } from '@/entities/Compilations';

interface CompilationsPageProps {
    className?: string;
}


const reducers: ReducersList = {
	wishesPage: wishesPageReducer,
}


const CompilationsPage = (props: CompilationsPageProps) => {
    const { className } = props;
	const dispatch = useAppDispatch();
    const isLoading = useSelector(getWishesPageIsLoading);
    const onLoadNextPart = useCallback(() => {
        if (!isLoading) {
			dispatch(fetchNextWishesPage());
		}
    }, [dispatch, isLoading]);


    return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
				<CompilationsList className={cls.CompilationsPage}/>  
		</DynamicModuleLoader>
        
    );
};

export default memo(CompilationsPage);


